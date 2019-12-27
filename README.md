# Accessible modal component with focus trap

Creates a modal container before the `</body>` tag and optional overlay to act as a portal for the dialog content.

```
yarn add accessible-modal
```

## API

1. **Create a modal**

Instantiate with [options](#options)

```
import { AccessibleModal } from 'accessible-modal';

const modal = new AccessibleModal({
  backdropClass: 'overlay',
  closeBtnClass: 'close-button',
});
```

to create and append a new `div` with aria attributes to the DOM.

2. **Open the modal**

Open using the `open()` method and pass the HTML to insert into the created modal and toggle its `aria-hidden` attribute.

```
modal.open(document.querySelector('.modal'));
```

## Focus management

- On opening the modal dialog, focus will be set to the first focusable element in the markup
- The focus will be trapped to all focusable elements inside the modal dialog
- `tab` will cycle through the focusable elements; `shift+tab` will cycle through them in reverse
- Upon closing the dialog, the focus will be returned to the last focused item

## Closing the modal

If a `closeBtnClass` is passed in the options, it will be queried for in the HTML element passed on `open()` and if no such element exists, a `button` will be created and appended with the appropriate attributes. An event listenter will be attached to provide close functionality.\
If no `closeBtnClass` is passed, no button will be created and no element will have the `close()` event listener attached.\
If `backdropClass` is passed in the options a backdrop layer will be created which will close the modal on click.\
The `esc` key will close the modal.

## Options

`backdropClass?: string`\
If passed, a `div` is appended before the modal to be used as the overlay, and given this class.

`closeBtnClass?: string`\
The class of the "close modal" button element in the markup that an event listener will be attached to. If not passed, the modal can still be closed by `esc`.

`labelledBy?: string`\
Creates an `aria-labelledby` attribute on the modal. This should correspond to the `id` of an element inside the modal that would make sense as a label for the modal's content.

`describedBy?: string`\
Creates an `aria-describedby` attribute on the modal. This should correspond to the `id` of an element inside the modal that would make sense as description text for the modal's content.

## Styles

None are provided.

On `open()`, `aria-hidden` is set to `false` on three elements:

1. The overlay, if used
2. The modal created on instantiation
3. The HTML element passed to the `open()` method

therefore `[aria-hidden="true"] { display: none; }` is convenient css to hide the backdrop layer and the modal if pre-rendered in the markup.
