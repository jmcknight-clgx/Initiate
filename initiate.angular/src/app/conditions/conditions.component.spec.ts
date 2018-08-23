import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsComponent } from './conditions.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';

describe('ConditionsComponent', () => {
  let component: ConditionsComponent;
  let fixture: ComponentFixture<ConditionsComponent>;
  let mockRouter;
  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
    TestBed.configureTestingModule({
      declarations: [ ConditionsComponent, ToolbarComponent ],
      imports: [MatIconModule, MatToolbarModule],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
