VERSION = 0.1.0
BROWSERIFY = node ./node_modules/browserify/bin/cmd.js
MOCHA = ./node_modules/.bin/mocha
UGLIFYJS = ./node_modules/.bin/uglifyjs
BANNER = "/*! theon-angular-adapter - v$(VERSION) - MIT License - https://github.com/theonjs/theon-angular-adapter */"
MOCHA_PHANTOM = ./node_modules/.bin/mocha-phantomjs

default: all
all: test
browser: uglify
test: browser mocha

uglify:
	$(UGLIFYJS) angular-adapter.js --mangle --preamble $(BANNER) --source-map angular-adapter.min.js.map --source-map-url http://cdn.rawgit.com/theonjs/theon-angular-adapter/$(VERSION)/angular-adapter.min.js.map > angular-adapter.min.js

mocha:
	$(MOCHA_PHANTOM) --reporter spec --ui bdd test/runner.html

loc:
	wc -l angular-adapter.js

gzip:
	gzip -c angular-adapter.min.js | wc -c

publish: browser release
	git push --tags origin HEAD:master
	npm publish
