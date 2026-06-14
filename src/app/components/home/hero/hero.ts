import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {

  public mostrarBotonReservar:boolean = true;

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  ngOnInit(): void {

    const usuario = this.authService.currentUser();

    if(usuario?.rol === 'Admin'){

      this.mostrarBotonReservar = false;

    }

  }

  irReservar(){

    this.router.navigate(['/reservar']);

  }

}