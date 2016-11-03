import { Injectable } from '@angular/core';

export class NavbarItem {
  route: string;
  label: string;
}

export type NavbarItems = NavbarItem[];

@Injectable()
export class NavbarService {

  constructor(private items: NavbarItems) {}

  getNavbarLinks() {
    return this.items;
  }

}
