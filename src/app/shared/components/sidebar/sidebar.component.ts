import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { PopUpService } from 'src/app/core/services/pop-up-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  // email: string = "";
  // role:string = "";

  constructor(private authService: AuthService, private router: Router,private popUpService: PopUpService) {}

  // ngOnInit(): void {
  //   this.authService.getUserDetails().subscribe({
  //     next: (data) => {
  //       this.email = data.email;
  //       this.role = data.role;
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch user details:', err);
  //     },
  //   });
  // }




  logout(): void {
    this.popUpService.confirm('Are you sure you want to Logout?').subscribe(result=>{
      if(result){
        this.authService.logout();
        this.router.navigate(['/home']);
      }
    });
  }

}
