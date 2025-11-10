import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// IMPORTACIONES NECESARIAS
// Para formularios
import { FormsModule } from '@angular/forms'; 
// Para componentes Ionic, Alertas y Animaciones
import { IonicModule, AlertController, AnimationController } from '@ionic/angular'; 
// Para recibir datos de la página de login
import { ActivatedRoute, Router } from '@angular/router'; 

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
    MatNativeDateModule
  ],
})
export class HomePage implements AfterViewInit { // AfterViewInit para la animación del título

  // Elementos HTML para animar
  @ViewChild('inputNombre', { read: ElementRef }) inputNombre!: ElementRef;
  @ViewChild('inputApellido', { read: ElementRef }) inputApellido!: ElementRef;
  @ViewChild('tituloAnimado', { read: ElementRef }) tituloAnimado!: ElementRef;

  // Variables para la lógica
  usuarioRecibido: string = "";
  nombre: string = "";
  apellido: string = "";
  nivelEducacion: string = "";
  fechaNacimiento: string = "";

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

  // LIMPIAR
  limpiar() {
    // Llamamos a la animación para los inputs
    this.animarInput(this.inputNombre.nativeElement);
    this.animarInput(this.inputApellido.nativeElement);

    // Limpiamos los datos del formulario
    this.nombre = "";
    this.apellido = "";
    this.nivelEducacion = "";
    this.fechaNacimiento = "";
  }

  // Función reutilizable para ANIMAR INPUTS
  animarInput(elemento: any) {
    this.animationCtrl.create()
      .addElement(elemento)
      .duration(1000) // 1 segundo 
      .iterations(1) // 1 iteración 
      .fromTo('transform', 'translateX(0px)', 'translateX(20px)') // Mov. izquierda a derecha 
      .fromTo('opacity', '1', '0.2')
      .direction('alternate') 
      .easing('ease-in-out')
      .play();
  }

  // --- (Paso 3) Función MOSTRAR ---
  async mostrar() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      // Mostramos nombre y apellido como pide el mockup 
      message: 'Su nombre es ' + this.nombre + ' ' + this.apellido,
      buttons: ['Yes'] 
    });
    await alert.present();
  }
}