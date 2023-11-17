import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { TeamViewComponent } from './views/team-view/team-view.component';
import { DocumentationViewComponent } from './views/documentation-view/documentation-view.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { FormComponent } from './components/home/form/form.component';
import { CardsComponent } from './components/team/cards/cards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './components/home/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    TeamViewComponent,
    DocumentationViewComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    CardsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
