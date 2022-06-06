import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted : boolean = false;
  loginForm! : FormGroup ;
  loading:boolean = false;
  error : string = '';
  returnurl : string = '';

  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute, private router : Router, private authenticationService : AuthenticationService) {

    if(this.authenticationService.currentUserValue.token !== ""){
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      "username" : ['',[Validators.required]],
      "password" : ['',[Validators.required,Validators.minLength(8)]]
    });

    this.returnurl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(!this.loginForm.valid){
      
      alert("Please enter password of length minimum 8 character");
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(data => {
      this.router.navigate([this.returnurl]);
    },error =>{
      this.error = error.error.message;
      this.loading = false;
    })
  }

  onForgotPassword(){
    this.router.navigate(['/forgotpassword']);
  }

}
