import { NgModule, ModuleWithProviders, Injector, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NavbarService, NavbarItems } from './navbar.service';

const NAVBAR_ITEMS = new OpaqueToken('NAVBAR_ITEMS');

function navbarServiceFactory(itemsCollection: NavbarItems[], injector: Injector) {
  let allItems = itemsCollection.reduce((aggregate, items) => aggregate.concat(items), []);
  return new NavbarService(allItems, injector);
}

export function provideItems(items: NavbarItems): any {
  return [
    {provide: NAVBAR_ITEMS, multi: true, useValue: items}
  ];
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [NavbarComponent]
})
export class NavbarModule {

  static forChild(items: NavbarItems): ModuleWithProviders {
    const providers = provideItems(items);
    return {ngModule: NavbarModule, providers: [providers]};
  }

  static forRoot(items: NavbarItems = []): ModuleWithProviders {

    let providers = [{
      provide: NavbarService,
      useFactory: navbarServiceFactory,
      deps: [NAVBAR_ITEMS, Injector]
    }];

    if (items.length) {
      providers.push(provideItems(items));
    }

    return {
      ngModule: NavbarModule,
      providers: providers
    };
  }

  constructor(private navbarService: NavbarService) {}

}

