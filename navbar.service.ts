import { Injectable, Injector } from '@angular/core';

export interface NavbarItem {
  route: string;
  label: string;
  weight?: number;
  canDisplay?: Function[];
}

export type NavbarItems = NavbarItem[];

@Injectable()
export class NavbarService {

  constructor(private items: NavbarItems, private injector: Injector) {
    this.items = this.items.map((item) => {
      if (item.weight === undefined) {
        item.weight = 0;
      }
      return item;
    });
  }

  getNavbarItems() {
    const canDisplay = (item) => {
      if (!item.canDisplay || !item.canDisplay.length) {
        return true;
      }
      return item.canDisplay.filter((guard) => this.injector.get(guard).canActivate(item)).length;
    };
    return this.items
      .filter((item) => canDisplay(item))
      .sort((a: NavbarItem, b: NavbarItem) => {
        if (a.weight === b.weight) {
          return 0;
        }
        if (a.weight < b.weight) {
          return -1;
        }
        return 1;
      });
  }

}

