import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule, MatSelectModule, MatMenuModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { LocalStorageService } from './services/local-storage.service';
import { ConditionsComponent } from './conditions/conditions.component';
import { routing } from 'src/app/app.routes';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    ConditionsComponent,
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
