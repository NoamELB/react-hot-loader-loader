# react-hot-loader-loader
A Webpack Loader that automatically insert react-hot-loader to your app, **without any changes in your app code**.

All it takes is a simple regex to indicate where your "App" Components are.

Example:

![react-hot-loader-loader example](https://i.imgur.com/PQDkTdW.gif)

[This example code (A very informative webpack example)](https://github.com/NoamELB/react-hot-loader-loader/tree/master/examples/webpack)

## Usage
1. Install
```
npm i react-hot-loader-loader
```

2. In your Webpack configuration, add this loader:
```js
{
    test: /\/App\.js$/, // regex to match files to receive react-hot-loader functionality 
    loader: require.resolve('react-hot-loader-loader'),
}
```
This loader **must** be placed after any ES6 transpiling loader (Babel), to make sure it transforms the code before it.

3. Add react-hot-loader to your Babel plugins:
```js
{
  "plugins": ["react-hot-loader/babel"]
}
```

[Working project example with HMR,  react-hot-loader and error recovery.](https://github.com/NoamELB/react-hot-loader-loader/tree/master/examples/webpack)

**The loader is dependent on react-hot-loader v4+, and won't work with earlier versions** (FYI, v4 is still in beta, though it is working very very well).

## How it works?
[react-hot-loader next](https://github.com/gaearon/react-hot-loader/tree/next) is amazing! It exposes an HOC that does all the heavy lifting. It can wrap any component and will add real time components tweaking functionality while using HMR.

This Webpack loader just make things cleaner and easier, **wrapping components with this HOC for you**. All that from a Webpack configuration and not from inside Components. 

This component:
```js
import React from 'react';

export default class App extends React.Component {
    render() {
        return 'something';
    }
}
```
Will transform to this (before ES6 transpilation):
```js
import {hot} from 'react-hot-loader';
import React from 'react';

class App extends React.Component {
    render() {
        return 'something';
    }
}
export default hot(module)(App);
```

[See the test for many more examples.](https://github.com/NoamELB/react-hot-loader-loader/blob/master/test/exampleFiles.js)

## Pros
* Easier to control through configuration, decide your convention and no need to add any additional code when creating a new app.
* No need to refactor old code.
* Can allow user input to change the "test" field of the loader, like with command arguments.
* You can remove the loader on certain Webpack configurations.

## License
MIT