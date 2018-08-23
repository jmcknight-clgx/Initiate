import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { CombatService } from '../services/combat.service';
import { MatToolbarModule, MatIconModule } from '@angular/material';
import { Router } from '@angular/router';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockCombatService;
  let mockRouter: any;
  beforeEach(async(() => {
    mockCombatService = jasmine.createSpyObj('CombatService', ['toggleCombat', 'isCombatInProgress']);
    mockCombatService.isCombatInProgress.and.returnValue(false);
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [MatToolbarModule, MatIconModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CombatService, useValue: mockCombatService }
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

  describe('getCombatButtonText', () => {
    it('should End when combat is in progress', () => {
      // arrange
      mockCombatService.isCombatInProgress.and.returnValue(true);

      // act 
      let result = component.getCombatButtonText();
      
      // assert
      expect(result).toBe("End");
    });

    it('should Start when combat is not in progress', () => {
      // arrange
      mockCombatService.isCombatInProgress.and.returnValue(false);

      // act 
      let result = component.getCombatButtonText();
      
      // assert
      expect(result).toBe("Start");
    });
  });

  describe('toggleCombat', () => {
    it('CombatService should call toggleCombat', () => {
      // act
      component.toggleCombat();

      // assert
      expect(mockCombatService.toggleCombat).toHaveBeenCalled();
    });
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
