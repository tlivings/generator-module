'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var face = require('cool-ascii-faces');


var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(face() + chalk.magenta('  Module Generator'));

    var prompts = [{
      name: 'moduleName',
      message: 'What would you like to call your module?'
    },
    {
      name: 'creatorName',
      message: 'What is your name?'
    },
    {
      name: 'githubUser',
      message: 'What is your github user name?'
    },
    {
      name: 'email',
      message: 'What is your email?'
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.creatorName = props.creatorName;
      this.githubUser = props.githubUser;
      this.email = props.email;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('lib');
    this.mkdir('test');

    this.template('_package.json', 'package.json');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('npmignore', '.npmignore');

    this.copy('README.md');
    this.copy('CHANGELOG.md');

    this.copy('lib/index.js');

    this.template('test/test.js', 'test/test-' + this.moduleName + '.js');
  }
});

module.exports = ModuleGenerator;