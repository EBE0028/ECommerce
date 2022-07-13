import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderAPIService } from '../order-api.service';
import { OrderServiceService } from '../order-service.service';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  flag_get:boolean=false;
  flag_show:boolean=false;
  flag_rp:boolean=false;
  PM:string="COD"
  orders: any;
  userAddress:any;
  oItems:any;
  GrandTotal:number=0;
  useridofloggeduser: string;
  datas: any;
  selectedCategory: string;
  products2:any[]=[];
  products:any;
  totalCount: number;
  products1: any;
 
  constructor(private service:OrderAPIService,private shopService: ShopService,private serv:OrderServiceService,private route:Router,private service1:CartService) { }
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
  public ContShopping()
  {
this.serv.goToHome()
  }
  public closeNow()
  {
    this.flag_show=false;

  }
  public showOrderDetails()
  {
    this.flag_show=true;
    let resp=this.service.getOrdersByID(parseInt(sessionStorage.getItem("UserId")));
    resp.subscribe(data=>{
      this.orders=data;
      this.showBill(this.orders.deliveryAddress,this.orders.orderId)
    });
 
  //   this.flag_show=true;
  // let resp=this.service.getOrdersByID(parseInt(sessionStorage.getItem("UserId")));
  // resp.subscribe(data=>{
  //   this.orders=data;
  //   console.log(this.orders)
  //   location.reload();
  // });
  
}
AddProdtoCart(ProductId:number):void{
  if(sessionStorage.getItem("UserId")!=undefined){
  this.useridofloggeduser=sessionStorage.getItem("UserId");
  this.service1.AddCart(ProductId,Number(this.useridofloggeduser)).subscribe(data=>{
    console.log(data);
    this.datas=data.result;
    })
}

else{
  this.route.navigateByUrl("login");
}
}
getProducts() {
  this.shopService.getProducts().subscribe(response => {
    this.products = response;

    this.products2=this.products
    this.totalCount=this.products2.filter(x=>x).length
    // this.products.forEach(element => {
    //   console.log(element);
    //   this.products2.push(element);
      
    // });
  })
}


FilterByCategory(demo:string)
  {
    if(demo=='All')
    {
      this.products2=this.products;
      this.totalCount=this.products2.filter(x=>x).length
    }
    else
    {
this.selectedCategory=demo;

this.products2=[];
this.products.forEach(element =>
{
  if(element.category==this.selectedCategory)
    {
      this.products2.push(element);
      console.log(this.products2);
    }
}
);
//To get the number of Products on the Display Page
this.totalCount=this.products2.filter(x=>x).length
}

  }
  
//order:any
  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")!=undefined){
    this.getProducts()
    this.FilterByCategory('All')
    // let resp=this.service.getOrdersByID(parseInt(sessionStorage.getItem("UserId")));
    // resp.subscribe(data=>{
    //   this.orders=data;
    //   this.showBill(this.orders.deliveryAddress,this.orders.orderId)
    // });
  }
  else{
    this.route.navigateByUrl("login")
  }

    //console.log(this.orders)
  
  }


  
}