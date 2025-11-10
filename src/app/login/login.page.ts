import { Component, OnInit } from '@angular/core';

// 1. IMPORTACIONES NECESARIAS
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { IonicModule, AlertController } from '@ionic/angular'; // Para ion-input, ion-button, AlertController
import { Router, NavigationExtras } from '@angular/router'; // Para navegar

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  
  // 2. AÑADIR IMPORTS PARA STANDALONE
  // Aquí le decimos a esta página independiente qué módulos necesita
  imports: [
    FormsModule,  // Permite usar [(ngModel)]
    IonicModule   // Permite usar <ion-input>, <ion-button>, etc.
  ] 
})
export class LoginPage implements OnInit {

  user = {
    usuario: "",
    password: ""
  }

  // 3. INYECTAR DEPENDENCIAS EN EL CONSTRUCTOR
  constructor(
    private router: Router, 
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  // 4. FUNCIÓN INGRESAR (DE LA PARTE 2)
  ingresar() {
    if (this.user.usuario.length < 3) {
      this.mostrarAlerta("Error", "El usuario debe tener entre 3 y 8 caracteres.");
      return;
    }
    if (this.user.password.length !== 4 || isNaN(Number(this.user.password))) {
      this.mostrarAlerta("Error", "La contraseña debe ser numérica de 4 dígitos.");
      return;
    }

    let navigationExtras: NavigationExtras = {
      state: {
        usuarioEnviado: this.user.usuario
      }
    };

    this.router.navigate(['/home'], navigationExtras);
  }

  // 5. FUNCIÓN DE ALERTA (DE LA PARTE 2)
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}