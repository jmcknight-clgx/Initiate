import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CharactersComponent } from '../characters/characters.component';
import { MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, MatSelectModule, MatButtonModule, MatInputModule, MatCardModule, MatMenuModule, MatDialog, MatDialogModule } from '@angular/material';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ToolbarComponent, CharactersComponent ],
      imports: [
        FormsModule, 
        BrowserAnimationsModule,
        MatIconModule, 
        MatToolbarModule, 
        MatListModule, 
        MatSidenavModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSelectModule,
        MatMenuModule,
        MatDialogModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
