import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilusuarioService } from 'src/app/services/perfilusuario.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.page.html',
  styleUrls: ['./personas.page.scss'],
})
export class PersonasPage implements OnInit {
  moduloCargado = false;
  listaUsuarios: any[] = [];
  constructor(
    private userService: UserService,
    private perfilUsuarioService: PerfilusuarioService,
    private router: Router
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.listaUsuarios = await this.userService.recuperarUsuarios();
    this.moduloCargado = true;
  }

  ionViewWillLeave() {
    this.moduloCargado = false;
  }

  verPerfilUsuario(
    uidUsuario: string,
    urlFotoUsuario: string,
    nombreUsuario: string
  ) {
    this.perfilUsuarioService.uidUsuarioVerPerfil = uidUsuario;
    this.perfilUsuarioService.urlFotoUsuarioVerPerfil = urlFotoUsuario;
    this.perfilUsuarioService.nombreUsuarioVerPerfil = nombreUsuario;

    this.router.navigate(['/usuario/perfilusuario']);
  }
}
