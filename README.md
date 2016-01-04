# theon-angular-adapter [![Build Status](https://api.travis-ci.org/theonjs/angular-adapter.svg?branch=master)][travis]

AngularJS [$http](https://docs.angularjs.org/api/ng/service/$http) agent adapter for theon based API clients

Works with AngularJS `+1.0` and theon `+0.1`.

## Installation

Via [npm](http://npmjs.com)
```bash
npm install theon-angular-adapter
```

Via [Bower](http://bower.io)
```bash
bower install theon-angular-adapter
```

Or loading the script remotely
```html
<script src="//cdn.rawgit.com/theonjs/angular-adapter/master/angular-adapter.js"></script>
```

### Environments

- Chrome >= 5
- Firefox >= 3
- Safari >= 5
- Opera >= 10
- IE >= 9

### Setup

Load the module as dependency of your application
```js
var app = angular.module('app', ['theon.adapter'])
```

### Services

#### $resilient

Main service to creating new Resilient HTTP clients

```js
app.config(function ($theonAdapter) {
  // Configure theon to use the agent adapter
  theon.agents.set($theonAdapter)
})
```

## API

`theon` API [documentation](https://github.com/h2non/theon).

### $theonAdapter(req, res, done)

`theon` HTTP agent adapter.

### Development

Only [node.js](http://nodejs.org) is required for development

Clone the repository
```bash
$ git clone https://github.com/theonjs/theon-angular-adapter.git && cd theon-angular-adapter
```

Install dependencies
```bash
$ npm install
```
```bash
$ bower install
```

Generate browser bundle source
```bash
$ make browser
```

Run tests
```bash
$ make test
```

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/theonjs/theon-angular-adapter
