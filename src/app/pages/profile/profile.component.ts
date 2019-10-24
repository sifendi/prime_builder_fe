import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {

  constructor() {

   }
  
   ngOnInit(): void {
        console.log('ngOnInit');
    }
}
