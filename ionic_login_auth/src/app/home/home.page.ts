import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any;
  constructor(public router: Router, 
              public authService: AuthenticationService,
              public toastService: ToastService) {
    this.user = authService.getProfile();
  }

  async logout(){
    this.authService.signOut().then(()=> {
      this.router.navigate(['/landing']);
    }).catch((error)=>{
      console.log(error);
    })
  }

  async deleteUser(){
    ( await this.authService.getProfile()).delete().then(()=> {
      this.toastService.showToast('User has been deleted successfully', 'top');
      this.router.navigate(['/landing']);
    }).catch((error)=>{
      console.log(error);
    })
  }
}
