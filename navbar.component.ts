import { Component, OnInit } from '@angular/core';
import { NavbarService, NavbarLink } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private navbarService: NavbarService) {
   }

  private navbarLinks: NavbarLink[];

  ngOnInit() {
    this.navbarLinks = this.navbarService.getNavbarLinks();
  }

}