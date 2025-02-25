// NG2
import { Injectable } from '@angular/core';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
// APP
import { NovoToastElement } from './Toast';

export type ToastThemes = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'positive' | string;
export type ToastIcons = 'bell' | 'check' | 'info' | 'warning' | 'remove' | 'caution' | 'times' | 'coffee' | 'danger' | string;
export type ToastPositions = 'fixedTop' | 'fixedBottom' | 'growlTopRight' | 'growlTopLeft' | 'growlBottomRight' | 'growlBottomLeft';

export interface ToastOptions {
  title?: string;
  message?: string;
  action?: string;
  icon?: ToastIcons;
  theme?: ToastThemes;
  accent?: ToastThemes;
  hideDelay?: number;
  position?: ToastPositions;
  isCloseable?: boolean;
  customClass?: string;
}

@Injectable()
export class NovoToastService {
  _parentViewContainer: any;
  references: Array<any> = [];
  icons = { default: 'bell', success: 'check', info: 'info', warning: 'warning', danger: 'remove' };
  defaults = { hideDelay: 3500, position: 'growlTopRight', theme: 'default' };

  constructor(private componentUtils: ComponentUtils) {}

  set parentViewContainer(view) {
    this._parentViewContainer = view;
  }

  alert(options: ToastOptions, toastElement: any = NovoToastElement): Promise<any> {
    return new Promise((resolve) => {
      if (!this._parentViewContainer) {
        console.error(
          'No parent view container specified for the ToastService. Set it inside your main application. \nthis.toastService.parentViewContainer = view (ViewContainerRef)',
        );
        return;
      }
      const toast = this.componentUtils.append(toastElement, this._parentViewContainer);
      this.references.push(toast);
      this.handleAlert(toast.instance, options);
      resolve(toast.instance);
    });
  }

  isVisible(toast) {
    return toast.show;
  }

  hide(toast) {
    toast.animate = false;
    setTimeout(() => {
      toast.show = false;
      const REF = this.references.filter((x) => x.instance === toast)[0];
      if (REF) {
        this.references.splice(this.references.indexOf(REF), 1);
        REF.destroy();
      }
    }, 300);
  }

  handleAlert(toast, options) {
    this.setToastOnSession(toast, options);
    setTimeout(() => {
      this.show(toast);
    }, 20);
    if (!toast.isCloseable) {
      this.toastTimer(toast);
    }
  }

  setToastOnSession(toast, opts) {
    const OPTIONS = typeof opts === 'object' ? opts : {};

    toast.parent = this;
    toast.title = OPTIONS.title || '';
    toast.message = OPTIONS.message || '';
    toast.action = OPTIONS.action || null;
    toast.hideDelay = OPTIONS.hideDelay || this.defaults.hideDelay;
    toast.link = OPTIONS.link || '';
    toast.isCloseable = OPTIONS.isCloseable || false;

    const CUSTOM_CLASS = OPTIONS.customClass || '';
    const ALERT_STYLE = OPTIONS.accent ? `novo-accent-${OPTIONS.accent}` : OPTIONS.theme || this.defaults.theme;
    const ALERT_POSITION = OPTIONS.position || this.defaults.position;
    const ALERT_ICON = OPTIONS.icon || this.icons.default;

    toast.iconClass = `bhi-${ALERT_ICON}`;
    toast.launched = true;
    toast.alertTheme = `${ALERT_STYLE} ${ALERT_POSITION} ${CUSTOM_CLASS} toast-container launched`;
  }

  show(toast) {
    toast.show = true;
    setTimeout(addClass, 25);
    /**
     * Adds animate class to be called after a timeout
     **/
    function addClass() {
      toast.animate = true;
    }
  }

  toastTimer(toast) {
    if (toast.hideDelay < 0) {
      return;
    }
    setTimeout(() => {
      this.hide(toast);
    }, toast.hideDelay);
  }
}
