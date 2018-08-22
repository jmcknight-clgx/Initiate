import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersComponent } from './characters.component';
import { LocalStorageService } from '../services/local-storage.service';
import { Character } from '../models/character';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { CharacterCondition } from '../models/character-condition';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let mockLocalStorage: any;

  beforeEach(async(() => {

    let characters = [{
      id: '1',
      name: "Sir Test",
      initiative: 11,
      ac: 15,
      conditions: [] as CharacterCondition[],
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
          id: '1',
          name: "Sir Test",
          initiative: 11,
          ac: 15,
          conditions: [] as CharacterCondition[],
        } as Character,
        {
          id: '2',
          name: "Sir Testyyyy",
          initiative: 20,
          ac: 1,
          conditions: [] as CharacterCondition[],
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
        id: '1',
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as CharacterCondition[],
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
        id: '1',
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as CharacterCondition[],
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
        id: '1',
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as CharacterCondition[],
      } as Character);
      component.characters = [character];

      // act
      component.removeCharacter(0, character);

      // assert
      expect(component.characters.length).toBe(0);
    });

    it('if character was selected, clearSelectedCharacter', () => {
      let character = Object.assign(new Character(), {
        id: '1',
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as CharacterCondition[],
      } as Character);
      component.selectedCharacterRef = character;
      component.selectedCharacter = character;
      component.characters = [character];

      // act
      component.removeCharacter(0, character);

      // assert
      expect(component.selectedCharacterRef).toBe(undefined);
      expect(component.selectedCharacter).toBe(undefined);
    });
  });

  describe('clearSelectedCharacter', () => {
    it('if character was selected, clears selected character and refs', () => {
      let character = Object.assign(new Character(), {
        id: '1',
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as CharacterCondition[],
      } as Character);
      component.selectedCharacterRef = character;
      component.selectedCharacter = character;
      component.characters = [character];

      // act
      component.clearSelectedCharacter();

      // assert
      expect(component.selectedCharacterRef).toBe(undefined);
      expect(component.selectedCharacter).toBe(undefined);
    });
  });

  describe('addCharacterCondition', () => {
    it('should add condition to selectedCharacter', () => {
      // arrange
      component.newCondition = new CharacterCondition();
      let character = Object.assign(new Character(), {
        id: '1',
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as CharacterCondition[],
      } as Character);
      component.selectedCharacter = character;

      // act
      component.addCharacterCondition();

      // assert
      expect(component.selectedCharacter.conditions.length).toBe(1);
      expect(component.newCondition).toEqual(new CharacterCondition());
    });
    
    it('does not add condition if newCondition is undefined', () => {
      // arrange
      component.newCondition = undefined;
      let character = Object.assign(new Character(), {
        id: '1',
        ac: 16,
        initiative: 12,
        name: "Sir Butts",
        conditions: [] as CharacterCondition[],
      } as Character);
      component.selectedCharacter = character;
  
      // act
      component.addCharacterCondition();
  
      // assert
      expect(component.selectedCharacter.conditions.length).toBe(0);
    });
  });

  describe('next', () => {
    it('Should update currentTurnId to the next character id', () => {
      // arrange
      component.characters = [
        {
          name: "Sir Test1",
          initiative: 11,
          ac: 15,
          conditions: [] as CharacterCondition[],
          id: "blah1",
        } as Character,
        {
          name: "Sir Test2",
          initiative: 20,
          ac: 1,
          conditions: [] as CharacterCondition[],
          id: "blah2",
        } as Character,
        {
          name: "Sir Test3",
          initiative: 3,
          ac: 5,
          conditions: [] as CharacterCondition[],
          id: "blah3",
        } as Character
      ] as Character[]; 

      component.currentTurnId = "blah2";

      // act
      component.next();

      // assert
      expect(component.currentTurnId).toBe("blah1");
    });

    it('Should update currentTurnId to the next character id when at the end', () => {
      // arrange
      component.characters = [
        {
          name: "Sir Test1",
          initiative: 11,
          ac: 15,
          conditions: [] as CharacterCondition[],
          id: "blah1",
        } as Character,
        {
          name: "Sir Test2",
          initiative: 20,
          ac: 1,
          conditions: [] as CharacterCondition[],
          id: "blah2",
        } as Character,
        {
          name: "Sir Test3",
          initiative: 3,
          ac: 5,
          conditions: [] as CharacterCondition[],
          id: "blah3",
        } as Character
      ] as Character[]; 

      component.currentTurnId = "blah3";

      // act
      component.next();

      // assert
      expect(component.currentTurnId).toBe("blah2");
    });
  });

});
