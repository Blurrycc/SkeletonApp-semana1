import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AnimationController, AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router'; // Para el botón de volver

// Importamos los módulos de Material para el Datepicker
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-agregar-juego',
  templateUrl: './agregar-juego.page.html',
  styleUrls: ['./agregar-juego.page.scss'],
  standalone: true,
  imports: [
    FormsModule, 
    IonicModule, 
    RouterLink,
    // Módulos de Material
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule
  ]
})
export class AgregarJuegoPage {

  // Variables para nuestro formulario
  juego = {
    nombre: "",
    plataforma: "",
    estado: "",
    fechaCompra: ""
  }

  // Capturamos los inputs para nuestra 2da Animación
  @ViewChild('inputNombre', { read: ElementRef }) inputNombre!: ElementRef;
  @ViewChild('inputPlataforma', { read: ElementRef }) inputPlataforma!: ElementRef;

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController
  ) { }

  limpiar() {
    // Usamos la animación de la S2 al limpiar
    this.animarInput(this.inputNombre.nativeElement);
    this.animarInput(this.inputPlataforma.nativeElement);

    this.juego = {
      nombre: "",
      plataforma: "",
      estado: "",
      fechaCompra: ""
    }
  }

  async guardar() {
    // Por ahora, solo mostramos una alerta
    const alert = await this.alertController.create({
      header: '¡Juego Guardado!',
      message: `Se guardó ${this.juego.nombre}.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Esta es nuestra 2da Animación
  animarInput(elemento: any) {
    this.animationCtrl.create()
      .addElement(elemento)
      .duration(1000).iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(20px)')
      .fromTo('opacity', '1', '0.2')
      .direction('alternate').easing('ease-in-out')
      .play();
  }
}