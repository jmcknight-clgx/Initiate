import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule, MatIconModule, MatMenuModule } from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Character } from '../models/character';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockLocalStorage;
  let mockRouter: any;
  beforeEach(async(() => {
    mockLocalStorage = jasmine.createSpyObj('LocalStorageService', ['getSavedBattles']);
    mockLocalStorage.getSavedBattles.and.returnValue([[new Character()]]);
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [MatToolbarModule, MatIconModule, MatMenuModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LocalStorageService, useValue: mockLocalStorage },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get saved battles', () => {
    component = fixture.componentInstance;
    expect(mockLocalStorage.getSavedBattles).toHaveBeenCalled();
    expect(component.savedBattles.length).toBe(1);
  });

  describe('navigateToConditions', () => {
    it('should call navigate with conditions', () => {
      // act
      component.navigateToConditions();

      // assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/conditions']);
    });
  });
});
