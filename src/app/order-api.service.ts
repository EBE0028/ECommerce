import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from './Address';
import { Observable } from 'rxjs';
import { Product } from './Product';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrderAPIService {
  
  constructor(private http:HttpClient,private router:Router) { }
  
  public message:any;
  public getOrders(){
    return this.http.get("http://localhost:10649/Orders/getOrders");
  }
  public getitems(id:Number):Observable<Product>{
    return this.http.get<Product>("https://localhost:44373/OrderItems/"+id);
  }
  public deleteitem(id:Number,oid:Number){
    this.http.delete("https://localhost:44373/OrderItems/"+id).subscribe((data) => 
    console.log(data));
    this.http.delete("https://localhost:44373/Orders/"+oid).subscribe((data) => 
    console.log(data));
    ;

  }
  public getimages(id:number){
    return this.http.get("https://localhost:44373/Products/"+id);
  }

  // public addAddress(product: Address,uid:number){
  //   return this.http.post("https://localhost:44373/Orders",product,{responseType:'text' as 'json'});
  //  }
   
  
  public addAddress(add: Address,uid:number){
    add.userId=uid;
    return this.http.post("http://localhost:10649/Orders",add,{responseType:'text' as 'json'});
   }
   goToBill(){
    console.log("Bill");
    this.router.navigate(['/','bill']);
  }
 // http://localhost:10649/Orders/GetById?id=1000

 public getOrdersByID(id:number)
 {
  return this.http.get("http://localhost:10649/Orders/GetById?id="+id);
  
 }
 public getAddByID(id:number)
 {
  return this.http.get("http://localhost:10649/Orders/GetUserAdd?uid="+id);
  
 }
 
 public getOItemsByID(id:number)
 {
  return this.http.get("http://localhost:10649/Orders/GetOrderItems?oid="+id);
  
 }
 
}