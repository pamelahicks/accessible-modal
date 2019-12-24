import { KEY_TAB } from './keys';

export class FocusTrap {
  private focusableEls: HTMLElement[];
  private focusedElBeforeOpen: HTMLElement | null;

  constructor(public dialogEl: HTMLElement) {
    this.dialogEl = dialogEl;
    this.focusedElBeforeOpen = null;

    this.focusableEls = Array.from(
      this.dialogEl.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]',
      ),
    );

    this.dialogEl.addEventListener('keydown', this.tab.bind(this));
  }

  public focus(): void {
    if (document.activeElement) {
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    }
    this.focusableEls[0].focus();
  }

  public focusPrevious(): void {
    this.focusedElBeforeOpen?.focus();
  }

  private tab(e: KeyboardEvent): void {
    const focusableEls = this.focusableEls;

    function handleBackwardTab() {
      if (document.activeElement === focusableEls[0]) {
        e.preventDefault();
        focusableEls[focusableEls.length - 1].focus();
      }
    }

    function handleForwardTab() {
      if (document.activeElement === focusableEls[focusableEls.length - 1]) {
        e.preventDefault();
        focusableEls[0].focus();
      }
    }

    if (e.keyCode === KEY_TAB) {
      if (focusableEls.length === 1) {
        e.preventDefault();
      }

      if (e.shiftKey) {
        handleBackwardTab();
      } else {
        handleForwardTab();
      }
    }
  }
}
