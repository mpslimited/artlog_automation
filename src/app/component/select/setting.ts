import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';



export const mySettings: IMultiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: false,
      containerClasses: 'containerDiv custDropdown',
      itemClasses: 'itemClassMultiSelect',
      closeOnSelect: true,
      autoUnselect: true,
      showUncheckAll: true,
      closeOnClickOutside: true
};


export const myTexts: IMultiSelectTexts | any = {
      checkAll: 'Select all',
      uncheckAll: 'Clear',
      checked: 'item selected',
      checkedPlural: 'items selected',
      searchPlaceholder: 'Find',
      searchEmptyResult: 'Result Not Found.',
      searchNoRenderText: 'Type in search box to see results...',
      defaultTitle: 'Select a value',
      allSelected: 'All selected',
};

export const myOptions = [
];


export class DataDropDownOptions {
      serviceURL?: string;
      keyName?: string;
      keyDesc?: string;
      firstOptionText?: string;
      firstOptionValue?: string;
      modelName?: string;
      multipleState = false;
      sizeCount = 0;
}
