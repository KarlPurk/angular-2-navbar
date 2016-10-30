import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NavbarService, NavbarLinks, NavbarLink } from './navbar.service';

const NAVBAR_LINKS = new OpaqueToken('NAVBAR_LINKS');

function navbarServiceFactory(navLinks: NavbarLinks[]) {
  let links = navLinks.reduce((aggregate, items) => aggregate.concat(items), []);
  return new NavbarService(links);
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

  static forChild(navbarLinks: NavbarLinks): ModuleWithProviders {
    return {ngModule: NavbarModule, providers: [provideNavLinks(navbarLinks)]};
  }

  static forRoot(navbarLinks: NavbarLinks): ModuleWithProviders {
    return {
      ngModule: NavbarModule,
      providers: [{
        provide: NavbarService,
        useFactory: navbarServiceFactory,
        deps: [NAVBAR_LINKS]
      }, provideNavLinks(navbarLinks)
      ]
    };
  }

}

export function provideNavLinks(navbarLinks: NavbarLinks): any {
  return [
    {provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: navbarLinks},
    {provide: NAVBAR_LINKS, multi: true, useValue: navbarLinks}
  ];
}