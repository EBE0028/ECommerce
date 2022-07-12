import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { CartService } from '../cart.service';
import { NavBarComponent } from '../core/nav-bar/nav-bar.component';
import { ShopService } from '../shop/shop.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  Product:any;
  useridofloggeduser:any;
  Product2:any[]=[];
  datas:any;
  display: string="none";
  
  constructor(private router:Router, private service:CartService,private store:ShopService) { }

  ngOnInit(): void {
    // @ViewChild(nav)NavBarComponent=NavBarComponent
    this.store.getProducts().subscribe(data=>{
      this.Product=data;
      this.Product2=this.Product.slice(-5,-1);
      sessionStorage.setItem("sample",'starting');
    });
  }

  AddProdtoCart(ProductId:number):void{
    if(sessionStorage.getItem("UserId")!=undefined){
      this.useridofloggeduser=sessionStorage.getItem("UserId");
    this.service.AddCart(ProductId,this.useridofloggeduser).subscribe(data=>{
      console.log("this is product data "+data);
      this.datas=data.result;
      })
  }
  else{
    this.router.navigateByUrl("login");
  }
}

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    window.location.reload();
    
  }

 



}


