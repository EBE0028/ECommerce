import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  constructor(private http:HttpClient) { }
  result:any;
  req="https://localhost:44325/api/Carts"
  public iscart:boolean=false;
  public isAdd:boolean=false;
  public isBill:boolean=false;

  GetcartforUser(userid:any){
    return this.http.get("https://localhost:44325/api/Carts?userId="+userid);
  }

  // Getcartcount(userid:any):Observable<any>{
  //   return this.http.get("https://localhost:44325/api/Carts/getcount?userId="+userid);
  // }

  AddCart(ProductId:number,userId:number):Observable<any>
  {
    return this.http.post<any>("https://localhost:44325/api/Carts?Prdid="+ProductId+"&userId="+userId, {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    }
    );
  }
  
  RemoveCartItem(ProductId:number,userId:number):Observable<any>
  {
    return this.http.put<any>("https://localhost:44325/api/Carts/Remove?Prdid="+ProductId+"&userId="+userId, {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    }
    );
  }
  
  
}
