import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-battle-modal',
  templateUrl: './battle-modal.component.html',
  styleUrls: ['./battle-modal.component.scss']
})
export class BattleModalComponent implements OnInit  {

  battleName: string = "untitled";
  constructor(@Inject(MAT_DIALOG_DATA) private data){}

  ngOnInit() {
      this.battleName = this.data ? this.data.name : 'untitled'

  }
}
