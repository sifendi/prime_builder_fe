import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { DydApi, App_productsApi ,LoopBackAuth}  from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'edit-product.component.html'
})
export class EditProductComponent {
	@ViewChild('name') name: NgModel;
	@ViewChild('unit') unit: NgModel;
	@ViewChild('unitvalue') unitvalue: NgModel;
	@ViewChild('points') points: NgModel;
	@ViewChild('quantity') quantity: NgModel;
	@ViewChild('producttype') producttype: NgModel;
	
	public id: number;
	products:any;
	display:boolean=false;
	result:any;
	submitted:boolean=false;
	prodName:any;
	prodPoints:any;
	prodUnit:any;
	prodUnitValue:any;
	prodType:any;
	prodQuantity:any;
	isCement:any;
	loading:boolean = false;
	userDetails:any;
  	rolename:any;
	constructor(private prodApi:App_productsApi,private router: ActivatedRoute, private loopAuth:LoopBackAuth) {
		// this.router.queryParams.subscribe(params => {
			// this.id = params["id"];
		// });
		this.id = this.router.snapshot.params['id'];
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	showDialog() { 
      this.display = true;
	}
	
	submit() {
		this.submitted=true; 
		if(this.name.valid&&this.unit.valid&&this.unitvalue.valid&&this.points.valid&&this.quantity.valid){
			var user_id = this.userDetails.userDet.id;    
			let para={
					name: this.name.value,
					unit:this.unit.value,
					unit_value:this.unitvalue.value,
					points:this.points.value,
					req_ac_approv_qty:this.quantity.value,
					type:this.producttype.value,
					is_cement:this.isCement,created_by:user_id, updated_by:user_id
			}
			this.loading = true;
			this.prodApi.addEditProduct(para,this.id).subscribe((Res)=>{
				console.log("res",Res);
				this.result = "success";
				this.display=true;
				this.submitted=false;
				this.loading = false;
			},(userErr)=>{
				console.log('UserError',userErr);
				this.result = "failed";    
				this.display=true;
				this.loading = false;
			});
		}
	}
	
	ngOnInit(): void {
		this.prodApi.findById(this.id).subscribe(
			data=>{
				this.products=data;
				this.prodName = this.products.name;
				this.prodUnit = this.products.unit;
				this.prodUnitValue = this.products.unit_value;
				this.prodPoints = this.products.points;
				this.prodType = this.products.type;
				this.prodQuantity = this.products.req_ac_approv_qty;
				this.isCement = this.products.is_cement;
				console.log(data);
			},
			err=>{

			},
			()=>{

			}
		);
  }
}
