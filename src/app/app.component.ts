import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studentportalapp';
  returnUrl : string = "";

  constructor(private authenticationService : AuthenticationService,private router : Router,
    private route : ActivatedRoute ){

      if(this.authenticationService.currentUserValue.token === ""){
          this.router.navigate(['/login']);
      }
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    validUser() : boolean {
      return this.authenticationService.currentUserValue.token !== "";
    }

    isAdmin() : boolean {
      return this.validUser() && this.authenticationService.currentUserValue.profession === "admin";
    }

    isStaffandStudent() : boolean {
      return this.validUser() && this.authenticationService.currentUserValue.profession === "faculty" || this.authenticationService.currentUserValue.profession === "student";
    }

    onLogout(){
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}
