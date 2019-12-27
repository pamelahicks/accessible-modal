import { KEY_RETURN } from './keys';

const CLOSE_LABEL = 'Close dialog';

export function closeButton(
  el: HTMLElement,
  closeBtnClass: string,
  closeAction: () => void,
): HTMLElement | null {
  let closeBtn: HTMLElement | null;

  // Find the close button
  closeBtn = el.querySelector(`.${closeBtnClass}`);

  // If button class was passed but no corresponding element exists, create one
  if (closeBtn == null && closeBtnClass) {
    closeBtn = document.createElement('button');
    closeBtn.classList.add(closeBtnClass);
    closeBtn.innerText = CLOSE_LABEL;
    el.appendChild(closeBtn);
  }

  // Set the type or the role on the close button
  if (closeBtn?.tagName === 'BUTTON' || closeBtn?.tagName === 'INPUT') {
    closeBtn.setAttribute('type', 'button');
  } else {
    closeBtn?.setAttribute('role', 'button');
    closeBtn?.setAttribute('tabindex', '0');
    closeBtn?.addEventListener('keypress', e => {
      e.preventDefault();
      if (e.keyCode === KEY_RETURN) {
        closeAction();
      }
    });
  }

  closeBtn?.addEventListener('click', closeAction);

  // If no aria-label exists on the close button, set one
  if (closeBtn?.getAttribute('aria-label') == null) {
    closeBtn?.setAttribute('aria-label', CLOSE_LABEL);
  }

  return closeBtn;
}
