# ngx-instagram-zoom

Angular component that implements Instagram-like zoom for mobile. No dependencies.

[![NPM](https://img.shields.io/npm/v/ngx-instagram-zoom.svg)](https://www.npmjs.com/package/ngx-instagram-zoom) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ngx-instagram-zoom
```

## Demo
- Open this CodeSandbox example in mobile to try it:
*Link Coming soon*

## Usage
- Wrap anything you want to make zoomable with `<Zoomable></Zoomable>` tags.
- It can zoom in any content (not only images) that css transform can be applied to.

```tsx
<Zoomable>
    <img
      src="https://github.com/AlexSapoznikov/react-instagram-zoom/blob/master/example/public/cat.png?raw=true"
      alt="Cat"
    />
</Zoomable>
```

## Docs

| Props | Type | Default | Description
| :--- | :--- | :--- | :--- |
| releaseAnimationTimeout | number | 500 | Animation speed for restoring original size of the image when user lifts up fingers.
| maxScale | number | Number.MAX_SAFE_INTEGER | Max zoom. For example value of 1 won't allow zooming in, value of 2 allows to zoom up to 100%.
| zIndex | number | Number.MAX_SAFE_INTEGER | z-index that is applied when zooming in.
| style | object | {} | Allows to add style to Zoomable component.
| className | string | _undefined_ | Allows to add className to Zoomable component
| | | | |
| **<h3>Events</h3>** | | | |
| _onReleaseAnimationStart_ | TouchEvent | _undefined_ | Event when release animation starts
| _onReleaseAnimationEnd_ | TouchEvent | _undefined_ | Event when release animation ends
| _onTouchStart_ | TouchEvent | _undefined_ | Event when touch starts
| _onTouchMove_ | TouchEvent | _undefined_ | Event when touch is in process
| _onTouchEnd_ | TouchEvent | _undefined_ | Event when touch ends

## License

MIT © [https://github.com/AlexSapoznikov/ngx-instagram-zoom](https://github.com/AlexSapoznikov/ngx-instagram-zoom)

---
---
---

# Workspace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
