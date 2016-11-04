import { Component, OnInit, ContentChild, ViewChild, ViewContainerRef, TemplateRef, DoCheck } from '@angular/core';
import { NavbarService, NavbarItems } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {

  private items: NavbarItems;

  @ContentChild(TemplateRef) customTemplate: TemplateRef<Object>;
  @ViewChild(TemplateRef) defaultTemplate: TemplateRef<Object>;

  constructor(private viewContainer: ViewContainerRef,
              private navbarService: NavbarService) {
   }

  ngOnInit() {
    this.items = this.navbarService.getNavbarItems();
  }

  ngDoCheck() {

    if (!this.defaultTemplate && !this.customTemplate) {
      return;
    }

    this.viewContainer.clear();

    if (this.customTemplate) {
      this.viewContainer.createEmbeddedView.call(this.viewContainer, this.customTemplate, {
        items: this.items
      });
    } else {
      this.viewContainer.createEmbeddedView.call(this.viewContainer, this.defaultTemplate, {
        items: this.items
      });
    }
  }

}
