import { Injectable } from '@angular/core';


export class NavbarLink {
  route: string;
  label: string;
}

export type NavbarLinks = NavbarLink[];

@Injectable()
export class NavbarService {

  constructor(private navbarLinks: NavbarLinks) {}

  getNavbarLinks() {
    return this.navbarLinks;
  }

}
