import { Component, OnInit, ContentChild, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { NavbarService, NavbarLink } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private navbarLinks: NavbarLink[];

  @ContentChild(TemplateRef) customTemplate: TemplateRef<Object>;
  @ViewChild(TemplateRef) defaultTemplate: TemplateRef<Object>;

  constructor(private viewContainer: ViewContainerRef,
              private navbarService: NavbarService) {
   }

  ngOnInit() {
    this.navbarLinks = this.navbarService.getNavbarLinks();
  }

  ngDoCheck() {

    if (this.viewContainer.length > 0) {
      return;
    }

    if (!this.defaultTemplate && !this.customTemplate) {
      return;
    }

    if (this.customTemplate) {
      this.viewContainer.createEmbeddedView.call(this.viewContainer, this.customTemplate, {
        items: this.navbarLinks
      });
    }
    else {
      this.viewContainer.createEmbeddedView.call(this.viewContainer, this.defaultTemplate, {
        items: this.navbarLinks
      });
    }
  }

}
