import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NavbarService, NavbarItems } from './navbar.service';

const NAVBAR_ITEMS = new OpaqueToken('NAVBAR_ITEMS');

function navbarServiceFactory(itemsCollection: NavbarItems[]) {
  let items = itemsCollection.reduce((aggregate, items) => aggregate.concat(items), []);
  return new NavbarService(items);
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
      deps: [NAVBAR_ITEMS]
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
    {provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: items},
    {provide: NAVBAR_ITEMS, multi: true, useValue: items}
  ];
}