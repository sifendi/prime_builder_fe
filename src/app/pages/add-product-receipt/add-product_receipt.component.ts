import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_productsApi,App_projectsApi,App_hpbApi,App_product_receiptApi} from '../../../shared/loopback_sdk';
@Component({
  templateUrl: 'add-product_receipt.component.html'
})
export class AddProductReceiptComponent {
  @ViewChild('projectid') project_id: any={};
  @ViewChild('productid') product_id: any={};
  @ViewChild('quantity') quantity: any={};
  @ViewChild('unit') unit: any={};  
  @ViewChild('pDate') pDate: any={};    
  @ViewChild('invcqnt') invc_qnt: any={};
  @ViewChild('comments') comments: any={};
  @ViewChild('longitude') longitude: any={};
  @ViewChild('latitude') latitude: any={};
  display:boolean=false;result:any;
  submitted:any;
  prodrecData:any;
  hpbData:any;
  projData:any;
  prodData:any;
  constructor(private prodRecApi:App_product_receiptApi,private prodApi:App_productsApi,private projApi:App_projectsApi,private hpbApi:App_hpbApi) {
  }
  submit() { 
    this.submitted=true;
    var purchsDate=new Date(this.pDate.value).getTime(); 
    const [projid, hpb] =  this.project_id.value.split('-');
		if(projid!==""&&hpb!=""){
			console.log('this is valid');
			let para = {};
			// hpb,
			// projid,
			// this.product_id.value,
			// this.quantity.value,
			// this.unit.value,
			// "1",
			// purchsDate,
			// this.invc_qnt.value,
			// this.comments.value,
			// this.latitude.value,
			// this.longitude.value,
			// "1","123456"
			this.prodRecApi.addEditProductReceipt(para).subscribe((Res)=>{
			  console.log('Res',Res);alert("success");
        this.result = "success";
        this.display=true;
			},(userErr)=>{
			  console.log('UserError',userErr);alert(userErr.message)
        this.result = userErr.message;    
        this.display=true;
			});
		 }
  }
  
  ngOnInit(): void {
    this.prodApi.find().subscribe(
			data=>{
				this.prodData=data;
				console.log(data);
			},
			err=>{

			},
			()=>{

			}
		);
    this.projApi.find().subscribe(
      data=>{
        this.projData = data;
        console.log(data);
      },
      err=>{

      },
      ()=>{

      }
    );
    this.hpbApi.find().subscribe(
      data=>{
        this.hpbData = data;
        console.log(data);
      },
      err=>{

      },
      ()=>{

      }
    );
  }
}
