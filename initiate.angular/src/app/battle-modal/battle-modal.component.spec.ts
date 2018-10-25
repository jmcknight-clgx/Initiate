import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleModalComponent } from './battle-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BattleModalComponent', () => {
  let component: BattleModalComponent;
  let fixture: ComponentFixture<BattleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleModalComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
