import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderAPIService } from '../order-api.service';
import { Product } from '../Product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any;
  items: any;
  images:any;
  orderon:string="7/7/2022";
  flag:boolean=false;
  constructor(private service:OrderAPIService,private route:Router) { }
  

  
  showorders(){
    this.flag=true;
    
    
  }
  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")!=undefined){
    let resp=this.service.getProducts();
    resp.subscribe((data)=>
      this.orders=data);
    }
    else{
      this.route.navigateByUrl("login");
    }
    
    
  }
  goTo(id:Number){
    
    let resp1=this.service.getitems(id);
    resp1.subscribe((data)=>this.items=data);
    let resp2=this.service.getimages(this.items.productId);
    resp2.subscribe((data)=>this.images=data);
    this.flag=true;
  }
  deleteitem(id:Number,oid:Number){
    
    this.service.deleteitem(id,oid);
    location.reload();
    
    
    
  }

}
