// NG2
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NovoModalRef } from './modal-ref';

@Component({
  selector: 'novo-modal',
  template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer><ng-content select="button,novo-button"></ng-content></footer>
  `,
})
export class NovoModalElement {
  constructor(private modalRef: NovoModalRef) {}
}

@Component({
  selector: 'novo-notification',
  template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header><ng-content select="label,novo-label"></ng-content></header>
    <section class="notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer><ng-content select="button,novo-button"></ng-content></footer>
  `,
})
export class NovoModalNotificationElement implements OnInit {
  @Input()
  type: string;
  @Input()
  icon: string;

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  iconType: string;

  constructor(private modalRef: NovoModalRef) {
    this.modalRef = modalRef;
  }

  close() {
    this.cancel.emit();
    this.modalRef.close();
  }

  ngOnInit() {
    switch (this.type) {
      case 'success':
        this.iconType = 'bhi-check';
        break;
      case 'warning':
        this.iconType = 'bhi-caution-o';
        break;
      case 'error':
        this.iconType = 'bhi-caution-o';
        break;
      case 'custom':
        this.iconType = `bhi-${this.icon}`;
        break;
      default:
        break;
    }
  }
}
