import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsComponent } from './conditions.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

describe('ConditionsComponent', () => {
  let component: ConditionsComponent;
  let fixture: ComponentFixture<ConditionsComponent>;
  let mockRouter;
  let mockLocalStorage;
  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
    mockLocalStorage = jasmine.createSpyObj('LocalStorageService', ['getConditions', 'saveConditions']);
    mockLocalStorage.getConditions.and.returnValue([]);
    TestBed.configureTestingModule({
      declarations: [ ConditionsComponent, ToolbarComponent ],
      imports: [MatIconModule, MatToolbarModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LocalStorageService, useValue: mockLocalStorage },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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

  describe('removeCondition', () => {
    it('should remove condition from conditions list', () => {
      // arrange
      component.characterConditions = ['inspiration'];

      // act 
      component.removeCondition(0);

      // assert
      expect(component.characterConditions.length).toBe(0);
    });

    it('should update local storage', () => {
      // arrange
      component.characterConditions = ['inspiration'];

      // act 
      component.removeCondition(0);

      // assert
      expect(mockLocalStorage.saveConditions).toHaveBeenCalled();
    });
  });

  describe('addCharacterCondition', () => {
    it('should save new condition', () => {
      // arrange
      component.newCondition = 'test';
      component.characterConditions = [];
      // act
      component.addCharacterCondition();

      // assert
      expect(component.characterConditions.length).toBe(1);
      expect(mockLocalStorage.saveConditions).toHaveBeenCalledWith(component.characterConditions);
    });

    it('should clear newConditions', () => {
      // arrange
      component.newCondition = 'test';
      component.characterConditions = [];
      // act
      component.addCharacterCondition();

      // assert
      expect(component.newCondition).toBe(undefined);
    });

    it('does not add newCondition if falsey', () => {
      // arrange
      component.newCondition = '';
      component.characterConditions = [];
      // act
      component.addCharacterCondition();

      // assert
      expect(component.characterConditions.length).toBe(0);
      expect(mockLocalStorage.saveConditions).not.toHaveBeenCalled();
    });
  })
});
