import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// IMPORTACIONES NECESARIAS
// Para formularios
import { FormsModule } from '@angular/forms'; 
// Para componentes Ionic, Alertas y Animaciones
import { IonicModule, AlertController, AnimationController } from '@ionic/angular'; 
// Para recibir datos de la página de login
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 

  // MÓDULOS REQUERIDOS
  imports: [
    FormsModule,          // Para formularios
    IonicModule,          // Para componentes Ionic
    
    // Módulos de Angular Material
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink
  ],
})

export class HomePage implements AfterViewInit { // AfterViewInit para la animación del título

  // Elementos HTML para animar
  @ViewChild('inputNombre', { read: ElementRef }) inputNombre!: ElementRef;
  @ViewChild('inputApellido', { read: ElementRef }) inputApellido!: ElementRef;
  @ViewChild('tituloAnimado', { read: ElementRef }) tituloAnimado!: ElementRef;

  // Variables para la lógica
  usuarioRecibido: string = "";

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController 
  ) {
    // Lógica para RECIBIR el usuario del Login
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Leemos el 'state' que enviamos desde el login
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras.state?.['usuarioEnviado'];
      }
    });
  }

  // Animación del Título
  // ngAfterViewInit se ejecuta una vez que la vista HTML se ha cargado
  ngAfterViewInit() {
    const animacionTitulo = this.animationCtrl.create()
      .addElement(this.tituloAnimado.nativeElement)
      .duration(2000)
      .iterations(Infinity) // La hacemos infinita para que se note
      .fromTo('transform', 'translateY(0px)', 'translateY(10px)')
      .fromTo('opacity', '1', '0.5')
      .direction('alternate') 
      .easing('ease-in-out');
    
    animacionTitulo.play();
  }
}