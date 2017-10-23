# minimal_fab
[![npm](https://img.shields.io/badge/npm-v1.2.0-green.svg)]()
[![license](https://img.shields.io/npm/l/express.svg)]()

An implementation of Floating Action Button by Google in plain css and javascript.

## Features

 - Fully customizable
 - Light weight
 - Doesn't require jquery or bootstrap
 - Includes a modal dialog to display messages and videos
 
## Installation
```shell
npm i minimal_fab
```

## Usage
```js
let fab = require('minimal_fab');
fabSetup([
    { type: 'text', text: `Here is some text that I'd like to see in a modal dialog` },
    { type: 'video', link: 'https://www.youtube.com/embed/EfvsNZIW970' },
    { type: 'link', link: 'http://youtube.com', title: 'Go to Youtube' },
    { type: 'custom', callback: () => { console.log('I can do almost anything')} },
]);
```
You can view the demo at [acesmndr.github.io/minimal_fab](acesmndr.github.io/minimal_fab)
or dig into the demo source code at [Demo Sourcecode](https://github.com/Acesmndr/minimal_fab/tree/gh-pages)

## Webpack configuration
For usage with webpack it requires `style-loader` and `css-loader` packages and the `webpack.config.js` must be set accordingly.
```js
const path = require('path');
module.exports = {
  entry: './main.js',
    module: {
      loaders: [
        { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
    },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
};
```

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[sweetalert](https://sweetalert.js.org/) | ^2.0.8 | ✖
[font-awesome](http://fontawesome.io/) | * | ✖

** Font awesome needs to be loaded separately **

## Author

Aashish Manandhar <acesmndr@gmail.com> http://github.com/acesmndr

## License

 - **MIT** : http://opensource.org/licenses/MIT

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
