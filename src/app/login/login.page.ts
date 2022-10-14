import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario
  mensaje: string

  constructor(private servicio: LoginService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }
  
  login(txtUser,txtPass) {
    this.usuario = this.servicio.obtenerUsuario(txtUser.value,txtPass.value)
    if ( this.usuario.user === txtUser.value && this.usuario.pass === txtPass.value && this.usuario.tipo === "cliente"){
      this.router.navigate(['/home',txtUser.value])
    }else if (this.usuario.user === txtUser.value && this.usuario.pass === txtPass.value && this.usuario.tipo ==="admin"){
      this.router.navigate(['/home',txtUser.value])
    }else if (this.usuario.user === txtUser.value && this.usuario.pass === txtPass.value && this.usuario.tipo ==="conductor"){
      this.router.navigate(['/home-conductor',txtUser.value])
    } else {
      this.mensaje = "Usuario y/o Contraseña Incorrectos"
      this.presentToast(this.mensaje);
    }
  } 

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      cssClass: 'alert-toast',
      icon: 'warning-outline'
    });

    await toast.present();
  }
}