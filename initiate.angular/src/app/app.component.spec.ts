import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('toggleCombat', () => {
    it('should set combatIsInProgress to true and combatButtonText to End', () => {
      // arrange
      component.combatIsInProgress = false;
      component.combatButtonText = "Start";

      // act 
      component.toggleCombat();
      
      // assert
      expect(component.combatButtonText).toBe("End");
      expect(component.combatIsInProgress).toBeTruthy();
    });

    it('should set combatIsInProgress to false and combatButtonText to Start', () => {
      // arrange
      component.combatIsInProgress = true;
      component.combatButtonText = "End";

      // act 
      component.toggleCombat();
      
      // assert
      expect(component.combatButtonText).toBe("Start");
      expect(component.combatIsInProgress).toBeFalsy();
    });
  });
});
