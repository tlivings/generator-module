'use strict';

var test = require('tape'),
    <%= _.slugify(appname) %> = require('../lib');

test('test', function (t) {

    t.test('plan', function (t) {
        t.plan(1);

        t.ok(true);
    });

});