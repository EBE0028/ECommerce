import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  basket$:any;
  currentUser$:string;
  constructor(private service:CartService,private route:Router,private userserv:UserService) { }
  datas:any;
  GrandTotal:number=0;
  loggedInUser:boolean=false;
  ngOnInit(): void {
    this.currentUser$=null;
    console.log("checking nav bar reload");
    // this.service.Getcartcount(1000).subscribe(data=>{
    //   console.log(data);
    //   this.basket$=data;
    // })
    if(sessionStorage.getItem("UserId")!=undefined){
      this.loggedInUser=false;
    }
    else{
      this.loggedInUser=true;
    }
  }
  logout():void{
    console.log(sessionStorage.getItem("UserId"));
    console.log("logout called");
    this.userserv.logout(sessionStorage.getItem("UserId")).subscribe();
    sessionStorage.clear();
    location.reload();
  }

  
}

