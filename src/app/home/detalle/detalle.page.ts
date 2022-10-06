import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomeService } from '../home.service';
import { Homes } from '../homes';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  conductor: Homes
  handlerMessage = '';
  roleMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private servicio: HomeService,
    private alerta: AlertController, private router: Router , private modalCtrl: ModalController,private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      this.conductor = this.servicio.obtenerHome(paramMap.get('id'))
      console.log(paramMap.get('id'))
      console.log(this.conductor)
    })
  }

  async  eliminar() {
    console.log("Eliminado")
    const aux = await this.alerta.create({
      header: 'Eliminar',
      message: 'Estas seguro de eliminar el dato?',
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
          text: 'Eliminar',
          handler: () => {
            this.servicio.eliminarHome(this.conductor.id)
            this.router.navigate(['/home'])
          }
        } 
      ]
    })

    await aux.present();

  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Desea continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Cancelada';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Confimada';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  
  }

