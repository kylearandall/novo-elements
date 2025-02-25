// NG2
import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
// Vendor
import dragula from '@bullhorn/dragula';
// APP
import { NovoDragulaService } from './DragulaService';

@Directive({
  selector: '[dragula]',
})
export class NovoDragulaElement implements OnInit, OnChanges {
  @Input('dragula')
  bag: any;
  @Input()
  dragulaModel: any;
  drake: any = null;
  container: any;

  constructor(element: ElementRef, private dragulaService: NovoDragulaService) {
    this.container = element.nativeElement;
  }

  ngOnInit() {
    const bag = this.dragulaService.find(this.bag);

    if (bag) {
      this.drake = bag.drake;
      this.checkModel();
      this.drake.containers.push(this.container);
    } else {
      this.drake = dragula({
        containers: [this.container],
      });
      this.checkModel();
      this.dragulaService.add(this.bag, this.drake);
    }
  }

  checkModel() {
    if (this.dragulaModel) {
      if (this.drake.models) {
        this.drake.models.push(this.dragulaModel);
      } else {
        this.drake.models = [this.dragulaModel];
      }
    }
  }

  ngOnChanges(changes) {
    if (changes && changes.dragulaModel) {
      if (this.drake) {
        if (this.drake.models) {
          const modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
          this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
        } else {
          this.drake.models = [changes.dragulaModel.currentValue];
        }
      }
    }
  }
}
