import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectList } from 'src/app/pages/common/common';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {

  @Input() data: SelectList[] = [];
  @Input() selectedId!: string;
  @Input() placeHolder!:string;
  @Input() isDisabled : boolean = false

  key!: any
  placeholder!: String;
  selectedValue: any

  @Output() selectedItem = new EventEmitter<any>();


  selectEvent(item: any) {

    this.selectedItem.emit(item)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
  constructor() { }

  ngOnInit() {
    
    this.key = this.data.filter(t => t.Id === this.selectedId)

    if (this.key[0] != null) {
      this.placeholder = this.key[0].Name
      this.selectEvent(this.key[0].Id)
    }   
    
  }

}

