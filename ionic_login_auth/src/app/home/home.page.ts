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
  user: any;
  email: string;

  constructor(public router: Router, 
              public authService: AuthenticationService,
              public toastService: ToastService ) {
    this.user = authService.getProfile();
  }

  ngOnInit() {
    this.setUserEmail();
  }

  async setUserEmail() {
    try {
      const userProfile = await this.authService.getProfile();
      if (userProfile && userProfile.email) {
        this.email = userProfile.email;
      } else {
        this.toastService.showToast('Unable to fetch user email.', 'bottom');
      }
    } catch (error) {
      console.log(error);
      this.toastService.showToast('Error fetching user profile.', 'bottom');
    }
  }

  async deleteUser() {
    (await this.authService.getProfile()).delete().then(() => {
      this.toastService.showToast('Kullanici basariyl silindi', 'top');
      this.router.navigate(['/landing']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/landing']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async updateEmail() {
    if (this.email !== '') {
      (await this.authService.getProfile()).updateEmail(this.email).then(() => {
        this.toastService.showToast('Email basariyla degistirildi', 'top');
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.toastService.showToast('Lütfen email giriniz', 'bottom');
    }
  }
}
