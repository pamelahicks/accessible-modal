import { FocusTrap } from './FocusTrap';
import { KEY_ESC } from './keys';

interface Options {
  backdropClass?: string; // expecting a class
  closeBtnClass?: string; // expecting a class
  labelledBy?: string;
  describedBy?: string;
}

interface DOM {
  modal: HTMLElement | null;
  backdropEl?: HTMLElement;
}

export class AccessibleModal {
  private DOM: DOM;
  private backdropClass: string | undefined;
  private closeBtnClass: string | undefined;
  private labelledBy: string | undefined;
  private describedBy: string | undefined;
  private newFocusTrap: FocusTrap | null;

  constructor({
    backdropClass,
    closeBtnClass,
    labelledBy,
    describedBy,
  }: Options) {
    this.backdropClass = backdropClass;
    this.closeBtnClass = closeBtnClass;
    this.labelledBy = labelledBy;
    this.describedBy = describedBy;
    this.newFocusTrap = null;

    this.DOM = {
      modal: null,
    };

    this.init();
  }

  public open(el: HTMLElement): void {
    const modal = this.DOM.modal;

    this.setButton(el);
    this.setAriaLabels(el);

    // Toggle the modal visibility class
    this.DOM.backdropEl?.setAttribute('aria-hidden', 'false');
    el.setAttribute('aria-hidden', 'false');

    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      modal.appendChild(el);

      this.newFocusTrap = new FocusTrap(modal);
      this.newFocusTrap.focus();
    }
  }

  private init(): void {
    // Set up the backdrop if required
    this.backdropClass && this.setBackdrop(this.backdropClass);

    // Set up the modal container
    const modal = document.createElement('div');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'true');

    modal.addEventListener('keydown', e => {
      if (e.keyCode === KEY_ESC) {
        this.close();
      }
    });

    this.DOM.modal = modal;

    // Mount the things
    this.DOM.backdropEl && document.body.appendChild(this.DOM.backdropEl);
    document.body.appendChild(this.DOM.modal);
  }

  private setBackdrop(backdropClass: string) {
    const newBackdrop = document.createElement('div');
    newBackdrop.classList.add(backdropClass);
    newBackdrop.setAttribute('aria-hidden', 'true');
    newBackdrop.setAttribute('tabindex', '-1');
    newBackdrop.addEventListener('click', this.close.bind(this));

    this.DOM.backdropEl = newBackdrop;
  }

  private setButton(el: HTMLElement) {
    // Find the close button
    const closeBtn = el.querySelector(`.${this.closeBtnClass}`);

    closeBtn?.setAttribute('type', 'button');
    closeBtn?.addEventListener('click', this.close.bind(this));

    if (closeBtn?.getAttribute('aria-label') == null) {
      closeBtn?.setAttribute('aria-label', 'Close dialog');
    }
  }

  private setAriaLabels(el: HTMLElement) {
    // Set the aria-labels if provided
    if (this.labelledBy) {
      // Find the id'ed element containing the `labelledby` string
      const labelledByEl = el.querySelector(`[id*=${this.labelledBy}]`);
      labelledByEl &&
        this.DOM.modal?.setAttribute('aria-labelledby', labelledByEl.id);
    }

    if (this.describedBy) {
      // Find the id'ed element containing the `describedby` string
      const describedByEl = el.querySelector(`[id*=${this.describedBy}]`);
      describedByEl &&
        this.DOM.modal?.setAttribute('aria-describedby', describedByEl.id);
    }
  }

  private close(): void {
    // Toggle the modal visibility class
    if (this.DOM.modal) {
      this.DOM.modal.setAttribute('aria-hidden', 'true');
      this.DOM.modal.innerHTML = '';
    }
    this.DOM.backdropEl?.setAttribute('aria-hidden', 'true');

    this.DOM.modal?.removeAttribute('aria-labelledby');
    this.DOM.modal?.removeAttribute('aria-describedby');

    this.newFocusTrap?.focusPrevious();
  }
}
