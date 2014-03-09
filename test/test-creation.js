/*global describe, beforeEach, it */
'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var test = require('tape');

test('module generator', function (t) {
    var app;

    function setup (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            app = helpers.createGenerator('module:app', [
                '../../app'
            ]);
            done();
        });
    }

    t.test('creates expected files', function (t) {

        setup(function () {
            var expected = [
                // add files you expect to exist here.
                '.jshintrc',
                '.gitignore',
                '.npmignore',
                'README.md',
                'CHANGELOG.md',
                'package.json',
                'test/test-mymodule.js',
                'lib/index.js'
            ];

            helpers.mockPrompt(app, {
                'moduleName' : 'mymodule'
            });

            app.options['skip-install'] = true;
            
            app.run({}, function () {
                expected.forEach(function (file) {
                    t.ok(fs.existsSync(file), 'file exists.');
                });
                t.end();
            });
        })
    });

});
