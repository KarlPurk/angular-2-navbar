import { Injectable, Injector } from '@angular/core';

export interface NavbarItem {
  route: string;
  label: string;
  canDisplay?: Function[];
} 

export type NavbarItems = NavbarItem[];

@Injectable()
export class NavbarService {

  constructor(private items: NavbarItems, private injector: Injector) {
  }

  getNavbarItems() {
    const canDisplay = (item) => {
      if (!item.canDisplay || !item.canDisplay.length) {
        return true;
      }
      return item.canDisplay.filter((guard) => this.injector.get(guard).canActivate(item)).length;
    }
    return this.items.filter((item) => canDisplay(item));
  }

}
