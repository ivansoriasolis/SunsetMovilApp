import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  cerrarSesion() {
    this.userService.eliminarDatosLocalStorage();
    this.router.navigate(['/login']);
  }
}
