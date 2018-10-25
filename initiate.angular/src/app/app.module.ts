import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule, MatSelectModule, MatMenuModule, MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { LocalStorageService } from './services/local-storage.service';
import { ConditionsComponent } from './conditions/conditions.component';
import { routing } from 'src/app/app.routes';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BattleModalComponent } from './battle-modal/battle-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    ConditionsComponent,
    HomeComponent,
    ToolbarComponent,
    BattleModalComponent,
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
    MatDialogModule,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
  entryComponents: [BattleModalComponent]
})
export class AppModule { }
