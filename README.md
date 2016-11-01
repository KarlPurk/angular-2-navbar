# Angular 2 Navbar
An Angular 2 navbar component that follows the Angular router pattern.  This allows you to keep your navbar link definitions in the components that they link to.

# Example Usage

Inside the `HomeRoutingModule`, import the `NavbarModule` and define the links for this module:

```js
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NavbarModule } from './../../navbar/navbar.module';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'home', component: HomeComponent }
  ]), NavbarModule.forChild([
    { route: '/home', label: 'Home' }
  ])],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
```

Inside the `AppComponent` (or wherever you want your navbar to appear) add the `app-navbar` element:

```html
<app-navbar></app-navbar>
```

Finally, import the `NavbarModule` module into the `AppModule` (or whatever module encapsulates the Component you added `app-navbar` to):

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NavbarModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
