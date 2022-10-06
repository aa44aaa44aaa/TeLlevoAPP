import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HomeService } from './home.service';
import Swal from 'sweetalert2'
import { MenuController } from '@ionic/angular';
declare var google;

/*interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  cliente: string
  conductor = []
  Titulo = "Viajes"
  
  constructor(private servicio: HomeService,
              private router: Router,
              private menu: MenuController,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
      this.conductor = this.servicio.obtenerHomes()
      this.cliente = this.activatedRoute.snapshot.paramMap.get("user")
  }

  ionViewWillEnter() {
    this.conductor = this.servicio.obtenerHomes()
  }

  agregar() {
    console.log("add")
    this.router.navigate(['/agregar'])
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
