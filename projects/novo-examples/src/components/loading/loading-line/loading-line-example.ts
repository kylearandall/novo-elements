import { Component } from '@angular/core';
import { FormUtils, SwitchControl, TextBoxControl } from 'novo-elements';

/**
 * @title Linear Loading Symbol
 */
@Component({
  selector: 'loading-line-example',
  templateUrl: 'loading-line-example.html',
  styleUrls: ['loading-line-example.css'],
})
export class LoadingLineExample {

  public switchControl: any;
  public textControl: any;
  public messageForm: any;

  constructor(private formUtils: FormUtils) {
    this.switchControl = new SwitchControl({ key: 'switch', tooltip: 'Enable Message Switch', label: 'Enable Message', checkboxLabel: 'Switch' });
    this.textControl = new TextBoxControl({
      key: 'text',
      label: 'Loading Message',
      tooltip: 'Loading Message Textbox',
      value: 'Hang tight, still loading.',
    });

    this.messageForm = formUtils.toFormGroup([
      this.textControl,
      this.switchControl,
    ]);
  }
}
