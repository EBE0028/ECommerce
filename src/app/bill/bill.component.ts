import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderAPIService } from '../order-api.service';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  flag_get:boolean=false;
  flag_show:boolean=false;
  PM:string="COD"
  orders: any;
  userAddress:any;
  oItems:any;
  GrandTotal:number=0;
  constructor(private service:OrderAPIService,private serv:OrderServiceService,private route:Router) { }
 public showBill(id:any,oid:any)
  {
    console.log(id)
    let resp=this.service.getAddByID(id);
    resp.subscribe(data=>{
      this.userAddress=data;

     console.log(this.userAddress)
     
    });
    //this.flag_get=true;
let oiresp=this.service.getOItemsByID(oid);
oiresp.subscribe(data=>{
  this.oItems=data;
  this.oItems.forEach(element => {
    this.GrandTotal=element.subTotal+this.GrandTotal
    });

  console.log(this.oItems)});
  this.flag_get=true;
  
  }

  public MyOrders()
  {
this.serv.goToOrders()
  }
  public closeNow()
  {
    this.flag_get=false;

  }
  public showOrderId()
  {
    this.flag_show=true;
  let resp=this.service.getOrdersByID(parseInt(sessionStorage.getItem("UserId")));
  resp.subscribe(data=>{
    this.orders=data;
    console.log(this.orders)
    location.reload();
  });
  
}
//order:any
  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")!=undefined){
    
    let resp=this.service.getOrdersByID(parseInt(sessionStorage.getItem("UserId")));
    resp.subscribe(data=>{
      this.orders=data;
      this.showBill(this.orders.deliveryAddress,this.orders.orderId)
    });
  }
  else{
    this.route.navigateByUrl("login")
  }

    //console.log(this.orders)
  
  }


  
}