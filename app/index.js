'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.prompting = function askFor() {
  var done = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the tasty ' + chalk.red('Almond') + ' generator!'
  ));

  var prompts = [
    {
      name: 'includeBootstrap',
      message: 'Would you like to include Bootstrap (y)?',
      type: 'confirm'
    },
    {
      name: 'includeUnderscore',
      message: 'Would you like to include Underscore (y)?',
      type: 'confirm'
    },
    {
      name: 'includeModernizr',
      message: 'Would you like to include Modernizr (y)?',
      type: 'confirm'
    },
    {
      name: 'includeFontAwesome',
      message: 'Would you like to include Font Awesome (y)?',
      type: 'confirm'
    },
    {
      name: 'includeLess',
      message: 'Would you like to include Less (y)?',
      type: 'confirm'
    },
    {
      when: function (answer) {
        return answer.includeLess;
      },
      type: 'confirm',
      name: 'includeLessHat',
      message: 'Would you like to use LessHat (y)? Read up more at \n' +
        chalk.green('https://github.com/madebysource/lesshat')
    }
  ];

  this.prompt(prompts, function (props) {
    
    this.includeBootstrap = props.includeBootstrap;
    this.includeUnderscore = props.includeUnderscore;
    this.includeModernizr = props.includeModernizr;
    this.includeFontAwesome = props.includeFontAwesome;
    this.includeLess = props.includeLess;
    this.includeLessHat = props.includeLessHat;

    done();
  }.bind(this));
};

Generator.prototype.writing = {
  app: function() {
    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.template('Gruntfile.js');

    this.mkdir('app');
    this.mkdir('app/scripts');

    this.template('index.html', 'app/index.html');
    this.template('config.js', 'app/scripts/config.js');
    this.template('main.js', 'app/scripts/main.js');
    this.copy('main.css', 'app/styles/main.css');
  },

  styles: function() {
    this.mkdir('app/styles');

    if(this.includeLess) {
      this.mkdir('app/less');
      this.copy('main.less', 'app/less/main.less');
    } else {
      this.copy('main.css', 'app/styles/main.css');
    }
    
  },

  projectfiles: function() {
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
  }
};

Generator.prototype.install = function () {
  this.installDependencies({
    skipInstall: this.options['skip-install']
  });
};

/*
Generator.prototype.app = function h5bp () {
    var done = this.async();

    this.remote('necolas', 'normalize.css', function (err, remote) {
        remote.copy('./normalize.css', 'app/css/normalize.css');
        done();
    }.bind(this));
};
*/


