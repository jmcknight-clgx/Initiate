import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule, MatIconModule } from '@angular/material';
import { Router } from '@angular/router';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockCombatService;
  let mockRouter: any;
  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [MatToolbarModule, MatIconModule],
      providers: [
        { provide: Router, useValue: mockRouter },
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

  describe('navigateToConditions', () => {
    it('should call navigate with conditions', () => {
      // act
      component.navigateToConditions();

      // assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/conditions']);
    });
  });
});
