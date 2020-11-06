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
