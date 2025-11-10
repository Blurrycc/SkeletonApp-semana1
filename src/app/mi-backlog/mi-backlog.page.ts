import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';   

@Component({
  selector: 'app-mi-backlog',
  templateUrl: './mi-backlog.page.html',
  styleUrls: ['./mi-backlog.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
    RouterLink  
  ]
})
export class MiBacklogPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}