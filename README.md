[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

### Install from npm:

```bash
npm install @ng4746/notice --save
```

Add needed package to NgModule imports:

```cmd
import { NoticeModule } from '@ng4746/notice';

@NgModule({
  ...
  imports: [
    NoticeModule.withConfig({
      global: {
        newOnTop: true,
        maxAtPosition: 6,
        maxOnScreen: 8,
        filterDuplicates: false
      },
      toast: {
        type: 'info'
      }}
    )
    ...
  ]
  ...
})
```


Add app.component.html:

```html
  <notice-section class="material"></notice-section>
```

Add styles.scss:

```scss
.material {
  @import "~@ng4746/notice/styles/material";
}
.simple {
  @import "~@ng4746/notice/styles/simple";
}
.dark {
  @import "~@ng4746/notice/styles/dark";
}

.snotify-icon {
  object-fit: cover;
  width: 100%;
  height: 100%;
  object-position: center;
}
```

## Credit
Inspired by [ng-snotify](https://github.com/artemsky/ng-snotify).


## MIT License


[npm-url]: https://www.npmjs.com/package/@ng4746/notice
[npm-image]: https://img.shields.io/npm/v/@ng4746/notice.svg

[downloads-image]: https://img.shields.io/npm/dm/@ng4746/notice.svg
[downloads-url]: https://npmjs.org/package/@ng4746/notice
