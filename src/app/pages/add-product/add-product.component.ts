import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { DydApi, App_productsApi, LoopBackAuth }  from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-product.component.html'
})
export class ProductCrudComponent {
	@ViewChild('name') name: NgModel;
	@ViewChild('unit') unit: NgModel;
	@ViewChild('unitvalue') unitvalue: NgModel;
	@ViewChild('points') points: NgModel;
	@ViewChild('producttype') producttype: NgModel;
	@ViewChild('quantity') quantity: NgModel;
	@ViewChild('cement') cement: NgModel;
	products:any;
	display:boolean=false;result:any;
	submitted:boolean=false;
	prodName:any;
	prodUnit:any;
	prodUnitValue:any;
	prodPoints:any;
	prodType:any;
	prodQuantity:any;
	isCement:any;
	busy:any;
	userDetails:any;
  	rolename:any;
	constructor(private prodApi:App_productsApi, private loopAuth:LoopBackAuth,private router:Router) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	showDialog() { 
      this.display = true;
	}
	
	submit() {
		this.submitted=true;
		if(this.name.valid&&this.unit.valid&&this.unitvalue.valid&&this.points.valid&&this.quantity.valid&&this.producttype.valid){
			var user_id = this.userDetails.userDet.id;    
			let para={
				    name: this.name.value,
					unit:this.unit.value,
					unit_value:this.unitvalue.value,
					points:this.points.value,
					req_ac_approv_qty:this.quantity.value,
					type:this.producttype.value,
					is_cement:this.cement.value,
					status:1,created_by:user_id, updated_by:user_id
			}
			this.busy = this.prodApi.addEditProduct(para).subscribe((Res)=>{
				this.result = "success";
				this.display=true;
				this.submitted=false;
				setTimeout(()=>{
					this.router.navigate(["/product"]);
				},3000);
			},(userErr)=>{
				this.result = "failed";    
				this.display=true;
			});
		}
	}
	ngOnInit(): void {
		this.prodApi.find().subscribe(
			data=>{
				this.products=data;
			},
			err=>{

			},
			()=>{

			}
		);
    }
	
	_onChange(files: FileList) : void {
         if(files && files.length > 0) {
              let file : File = files.item(0);
			  let reader: FileReader = new FileReader();
			  reader.onload = (e) => {
			  let csv: string = reader.result;
			  var lines = csv.split('\n');
			  for(var i=0; i<lines.length; i++){
				   var headerValues = lines[i].split(',');
			  }
			  //From here you can either use a csv parse library, or your own
			  //implementation if you know what the structure of the csv is
				}

			reader.readAsText(file);
              //Now you can get
         }
    }
}
