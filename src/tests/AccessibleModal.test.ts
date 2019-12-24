import { AccessibleModal } from '..';

test('AccessibleModal instantiates with a DOM object', () => {
  expect(new AccessibleModal({})).toMatchObject({ DOM: {} });
});

test('Accessible modal instantiates backdrop class string when one is passed', () => {
  expect(new AccessibleModal({ backdropClass: 'overlay' })).toMatchObject({
    DOM: {},
    backdropClass: 'overlay',
  });
});

test('Accessible modal instantiates close button class string when one is passed', () => {
  expect(new AccessibleModal({ closeBtnClass: 'close' })).toMatchObject({
    DOM: {},
    closeBtnClass: 'close',
  });
});

test('Accessible modal instantiates the container with an `aria-labelledby` attribute when one is passed', () => {
  expect(new AccessibleModal({ labelledBy: 'modal-title' })).toMatchObject({
    DOM: {},
    labelledBy: 'modal-title',
  });
});

test('Accessible modal instantiates the container with an `aria-describedby` attribute when one is passed', () => {
  expect(
    new AccessibleModal({ describedBy: 'modal-description' }),
  ).toMatchObject({
    DOM: {},
    describedBy: 'modal-description',
  });
});
