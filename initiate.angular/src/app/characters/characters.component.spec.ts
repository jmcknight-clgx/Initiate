import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersComponent } from './characters.component';
import { LocalStorageService } from '../services/local-storage.service';
import { Character } from '../models/character';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { Condition } from '../models/character-condition';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let mockLocalStorage: any;

  beforeEach(async(() => {

    let characters = [{
      name: "Sir Test",
      initiative: 11,
      ac: 15,
      conditions: [] as Condition[],
    } as Character] as Character[];

    mockLocalStorage = jasmine.createSpyObj('LocalStorageService', ['addCharacter', 'saveCharacters', 'getCharacters']);
    mockLocalStorage.getCharacters.and.returnValue(characters)

    TestBed.configureTestingModule({
      declarations: [
        CharactersComponent
      ],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorage }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getOrderedCharacters', () => {
    it('should return descending ordered list of characters', () => {
      // arrange 
      component.characters = [
        {
          name: "Sir Test",
          initiative: 11,
          ac: 15,
          conditions: [] as Condition[],
        } as Character,
        {
          name: "Sir Testyyyy",
          initiative: 20,
          ac: 1,
          conditions: [] as Condition[],
        } as Character
      ] as Character[];

      // act
      let result = component.getOrderedCharacters()

      // assert
      expect(result[0].initiative).toBe(20);
    })
  });

  describe('displayNewCharacterForm', () => {
    it('should assign a value to selectedCharacter', () => {
      // arrange
      component.selectedCharacterRef = undefined;

      // act
      component.displayNewCharacterForm();

      // assert
      expect(component.selectedCharacterRef).toBeTruthy();
    });
  });

  describe('saveCharacter', () => {
    it('should call localStorageService', () => {
      // arrange
      let character = Object.assign(new Character(), {
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as Condition[],
      } as Character);
      component.selectedCharacterRef = character;
      component.newCharacter = character;

      // act
      component.saveCharacter();

      // assert
      expect(mockLocalStorage.addCharacter).toHaveBeenCalledWith(character, component.characters);
    });

    it('should set newCharacter to undefined', () => {
      // arrange
      let character = Object.assign(new Character(), {
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as Condition[],
      } as Character);
      component.selectedCharacterRef = character;
      component.newCharacter = character;

      // act
      component.saveCharacter();

      // assert
      expect(component.newCharacter).toBeFalsy();
    });
  });

  describe('resetForm', () => {
    it('should set character arrays to empty', () => {
      // arrange

      // act
      component.resetForm();

      // assert
      expect(mockLocalStorage.saveCharacters).toHaveBeenCalledWith([] as Character[]);
      expect(component.characters.length).toBe(0);
      expect(component.selectedCharacterRef).toBe(undefined);
      expect(component.selectedCharacter).toBe(undefined);
    });
  });

  describe('removeCharacter', () => {
    it('removes character', () => {
      let character = Object.assign(new Character(), {
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as Condition[],
        isSelected: false
      } as Character);
      component.characters = [character];

      // act
      component.removeCharacter(0, character);

      // assert
      expect(component.characters.length).toBe(0);
    });

    it('if character was selected, clearSelectedCharacter', () => {
      let character = Object.assign(new Character(), {
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as Condition[],
        isSelected: true
      } as Character);
      component.selectedCharacterRef = character;
      component.selectedCharacter = character;
      component.characters = [character];

      // act
      component.removeCharacter(0, character);

      // assert
      expect(component.selectedCharacterRef).toBe(undefined);
      expect(component.selectedCharacter).toBe(undefined);
      expect(component.characters.filter(c => c.isSelected).length).toBe(0);
    });
  });

  describe('clearSelectedCharacter', () => {
    it('if character was selected, clears selected character and refs', () => {
      let character = Object.assign(new Character(), {
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as Condition[],
        isSelected: true
      } as Character);
      component.selectedCharacterRef = character;
      component.selectedCharacter = character;
      component.characters = [character];

      // act
      component.clearSelectedCharacter();

      // assert
      expect(component.selectedCharacterRef).toBe(undefined);
      expect(component.selectedCharacter).toBe(undefined);
      expect(component.characters.filter(c => c.isSelected).length).toBe(0);
    });
  });

  describe('addCharacterCondition', () => {
    it('should add condition to selectedCharacter', () => {
      // arrange
      component.newCondition = 'test';
      let character = Object.assign(new Character(), {
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as Condition[],
        isSelected: true
      } as Character);
      component.selectedCharacter = character;

      // act
      component.addCharacterCondition();

      // assert
      expect(component.selectedCharacter.conditions.length).toBe(1);
    });
    
    it('does not add condition if newCondition is undefined', () => {
      // arrange
      component.newCondition = undefined;
      let character = Object.assign(new Character(), {
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as Condition[],
        isSelected: true
      } as Character);
      component.selectedCharacter = character;
  
      // act
      component.addCharacterCondition();
  
      // assert
      expect(component.selectedCharacter.conditions.length).toBe(0);
    });

  });

});
