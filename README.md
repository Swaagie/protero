# protero

Utility method for transpiling dependencies with babel. By default `node_modules` are not transpiled by [Babel](https://babeljs.io/). This compiler/require hook allows you to include certain `node_modules` or extensions.

### Install

```
npm install --save-dev protero
```

### Usage

Add the following to your `package.json`.

```json
{
  "scripts": {
    "test": "mocha --spec reporter --compilers js:protero ./test.js"
  },
  "protero": {
    "extensions": [ "js", "jsx" ], // optional, defaults are listed.
    "modules": [
      "dependency1",
      "dependency2"
    ]
  }
}
```

### License

See LICENSE.md