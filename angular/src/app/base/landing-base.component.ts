import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './landing-base.component.html',
  styleUrls: ['./landing-base.component.scss', './toolbar.scss']
})
export class AuthComponent implements OnInit {
  currentRoute: string = '/';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
