import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  newUser:any;
  isSuccess:boolean = false;
  registeredMessage:string;
  constructor(public server:UserService, private route:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")!=undefined){
      this.route.navigateByUrl("Home");
    }
  }
  
  addUser():any{
    this.server.pushUser(this.user).subscribe(response=>{
      this.newUser = response;
      console.log("In addUser function.");
      if(this.newUser==null){
        this.isSuccess = false;
        this.registeredMessage = "Unable to process your request. Adding new User failed.";
      }
      else{
        this.isSuccess=true;
        this.registeredMessage = this.newUser.firstName+" created successfully.";
        console.log(this.registeredMessage);
      }
    });
  }

 


}
