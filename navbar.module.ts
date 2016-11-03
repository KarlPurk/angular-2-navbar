import { NgModule, ModuleWithProviders, Injector, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NavbarService, NavbarItems } from './navbar.service';

const NAVBAR_ITEMS = new OpaqueToken('NAVBAR_ITEMS');

function navbarServiceFactory(itemsCollection: NavbarItems[], injector: Injector) {
  let items = itemsCollection.reduce((aggregate, items) => aggregate.concat(items), []);
  return new NavbarService(items, injector);
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

  constructor(private navbarService: NavbarService) {}

  static forChild(items: NavbarItems): ModuleWithProviders {
    return {ngModule: NavbarModule, providers: [provideItems(items)]};
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

}

export function provideItems(items: NavbarItems): any {
  return [
    {provide: NAVBAR_ITEMS, multi: true, useValue: items}
  ];
}