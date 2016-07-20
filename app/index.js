'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs-extra')
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var async = require('async');

var BrfeboilerplateGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.on('end', function () {
      if (!this.options['skip-install']) {

        //write all dependencies
        var context = this.answers,
            npmdir = process.cwd() + '/' + context.root,
            npmdeps = [],
            yeo = this; 

        console.log('now installing dependencies in:',npmdir);

        //Browsersync
        if (context.Webserver === 'browsersync') {
          npmdeps.push('grunt-browser-sync');
        }
        //connect
        if (context.Webserver === 'connect') {
          npmdeps.push('grunt-contrib-connect');
        }
        //dustjs
        if (context.dustjs) {
          npmdeps.push('grunt-dust-html');
          npmdeps.push('dustjs-helpers');
        }

        //less
        if (context.preProcessor === 'less') {
          npmdeps.push('grunt-contrib-less');
        }

        //rubysass
        if (context.preProcessor === 'rubysass') {
          npmdeps.push('grunt-contrib-sass');
        }

        //libsass
        if (context.preProcessor === 'libsass') {
          npmdeps.push('grunt-sass');
		  npmdeps.push('compass-mixins');
        }
		
		for (var key in context.extramodules) {
			if(context.extramodules[key] == 'bootstrap' && context.preProcessorExt !== 'less') {
				context.extramodules[key] = 'bootstrap-sass';
			}
			npmdeps.push(context.extramodules[key]);
		}
        //cd 
        process.chdir(npmdir);
        //install

        async.series({
            /*bower: function(cb){
                yeo.bowerInstall(context.extramodules, { 'saveDev': true },function() {
                  cb(null,true);
                });
            },*/
            corenpm: function(cb){
                yeo.npmInstall([], { 'saveDev': true },function() {
                  cb(null,true);
                });
            },
            addnpm: function(cb){
                yeo.npmInstall(npmdeps, { 'saveDev': true },function() {
                  cb(null,true);
                });
            }

          },function(err, results) {


            if (context.hasBootstrap) {
              var bssrc = yeo.destinationRoot() + '/node_modules/bootstrap' + (context.preProcessorExt === 'less' ? '/less' : '-sass/assets/stylesheets');
              var bsdst = yeo.destinationRoot() + '/styles/overrides/bootstrap';
			  var ext = context.preProcessorExt;
              yeo.mkdir(bsdst);
              fs.copySync(bssrc  + (ext === 'less' ? '/' : '/_') + 'bootstrap.' + ext, bsdst + (ext === 'less' ? '/' : '/_') + 'bootstrap.' + ext);
              fs.copySync(bssrc  + (ext === 'less' ? '/' : '/bootstrap/_') + 'variables.' + ext, bsdst  + (ext === 'less' ? '/' : '/bootstrap/_') + 'variables.' + ext);
            }

            /*if (context.hasLessFontAwesome) {
              var fasrc = yeo.destinationRoot() + '/node_modules/font-awesome/fonts';
              var fadst = yeo.destinationRoot() + '/static/assets/fonts';
              fs.copySync(fasrc+'/fontawesome-webfont.eot',fadst+'/fontawesome-webfont.eot');
              fs.copySync(fasrc+'/fontawesome-webfont.woff',fadst+'/fontawesome-webfont.woff');
              fs.copySync(fasrc+'/fontawesome-webfont.svg',fadst+'/fontawesome-webfont.svg');
              fs.copySync(fasrc+'/fontawesome-webfont.ttf',fadst+'/fontawesome-webfont.ttf');
            }*/

            if (context.respondjs) {
              var rssrc = yeo.destinationRoot() + '/node_modules/respond.js/dest';
              var rsdst = yeo.destinationRoot() + '/static/' + context.assetspath + '/js/vendor';
              fs.copySync(rssrc  + '/respond.min.js', rsdst + '/respond.min.js');
            }       

            yeo.log(yosay('All Done!'));

        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    var processAnswers = function(answers) {
		
        //answers.BuildSystem = 'Grunt';
        answers.vagrant = false;
		answers.dustjs = true;

        //preprocessor language
        answers.preProcessorLang = answers.preProcessor.replace(/(ruby|lib)/,'');
        answers.preProcessorExt = answers.preProcessorLang.replace(/(sass)/,'scss');

        //respond.js
        answers.respondjs = (answers.extramodules.filter(function(module){
            return module === 'respond.js';
        }).length);

        //bootstrap
        answers.hasBootstrap = (answers.extramodules.filter(function(module){
            return module === 'bootstrap';
        }).length);

        //fontawsome
        answers.hasFontAwesome = (answers.extramodules.filter(function(module){
            return module === 'font-awesome';
        }).length);
        /*answers.hasLessFontAwesome = (answers.extramodules.filter(function(module){
            return module === 'font-awesome';
        }).length && answers.preProcessor === 'less');
		
        answers.hasSassFontAwesome = (answers.extramodules.filter(function(module){
            return module === 'font-awesome';
        }).length && (answers.preProcessor === 'rubysass' || answers.preProcessor === 'libsass'));*/

        return answers;
    };

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the freakin\' awesome CheatDust generator!'));

    var prompts = [{
        name: 'appName',
        message: 'What is the name of project?'
    },
    {
        name: 'appDescription',
        message: 'What the description?',
        default: 'BR project'
    },
    // {   
    //     type: 'confirm',
    //     default: false,
    //     name: 'vagrant',
    //     message: 'Would you like to use Vagrant?'
    // },
    {
        name: 'srcdir',
        message: 'Name for source folder?',
        default: 'src'
    },
    {
        name: 'distpath',
        message: 'Name for dist folder?',
        default: 'dist'
    },
    {
        name: 'assetspath',
        message: 'Name for assets folder?',
        default: 'assets'
    },
    {   
        type: 'list',
        default: 'less',
        name: 'preProcessor',
        message: 'Which CSS preProcessor would you like to use?',
        choices: [
            {value:'less',      name:'LESS'},
            {value:'rubysass',  name:'SCSS - Ruby'},
            {value:'libsass',   name:'SCSS - libsass (experimental)'}
        ]
    },
    {
        type: 'list',
        default: 'connect',
        name: 'Webserver',
        message: 'Do you need a webserver?',
        choices: [
            {value: null,            name:'No' },
            {value:'connect',       name:'Connect (with liveReload)' },
            {value:'browsersync',   name: 'Browsersync' }
        ]
    },
    /*{   
        type: 'confirm',
        default: true,
        name: 'dustjs',
        message: 'Would you like to use Dust.js Templates?'
    },*/
    {
        type: 'checkbox',
        name: 'extramodules',
        default: [],
        message: 'Would you like to install additional libraries?',
        choices: [
            {value:'respond.js',		name:'Respond', checked: true },
            {value:'bootstrap',			name:'Twitter Bootstrap', checked: true },
            {value:'font-awesome',		name:'Font Awesome', checked: true },
            {value:'grunt-mout',		name:'Mout'},
            {value:'hammerjs',      	name:'Hammerjs'},
            {value:'backbone',      	name:'Backbone'}
        ]
    }];

    this.prompt(prompts, function (answers) {

      this.answers = processAnswers(answers);
      this.answers.appNameSlug = this._.slugify(answers.appName);
      done();

    }.bind(this));
  },

  createSrc: function () {

    var srcdir = this.answers.srcdir,
        context = this.answers;

    if (context.vagrant) {
      this.mkdir('www');
      this.mkdir('www/'+srcdir);
      this.template('vagrant/_bootstrap.sh','bootstrap.sh',context);
      this.copy('vagrant/_Vagrantfile','Vagrantfile');
      this.answers.root = 'www/'+srcdir;
      this.log('created Vagrant folder');
    } else {
      this.mkdir(srcdir);
      this.answers.root = srcdir;
      this.log('created '+ srcdir +' folder'); 
    }

  },
  
  setGrunt: function(){
    var tgtdir = this.answers.root,
		context = this.answers;	
    this.directory('grunt',tgtdir + '/grunt');
	
	//preProcessor
	this.directory(context.preProcessorExt + '/grunt',tgtdir + '/grunt');	
  },

  javascript: function() {
    var tgtdir = this.answers.root;   
    this.directory('js',tgtdir + '/js');
  },
  
  styles: function(){
    var tgtdir = this.answers.root,
        context = this.answers;

    this.mkdir(tgtdir + '/styles');
    this.template(context.preProcessorExt + '/_styles.' + context.preProcessorExt,tgtdir + '/styles/styles.' + context.preProcessorExt,context);

	if(!context.hasFontAwesome) { return; }
	this.mkdir(tgtdir + '/styles/overrides');
	this.directory(context.preProcessorExt + '/overrides/fontawesome',tgtdir + '/styles/overrides/fontawesome');
  },

  static: function() {
    var tgtdir = this.answers.root,
        context = this.answers;

    this.mkdir(tgtdir + '/static');
    this.directory('static/' + this.answers.assetspath, tgtdir + '/static/' + this.answers.assetspath);
    /*if (!context.dustjs) {
      this.copy('static/index.html',tgtdir + '/static/index.html');
    }*/
  },

  dustjs: function() {
    var tgtdir = this.answers.root,
        context = this.answers;

    if (!context.dustjs) { return; }
    this.mkdir(tgtdir + '/templates');
    this.mkdir(tgtdir + '/templates/data');
    this.mkdir(tgtdir + '/templates/includes');
    this.mkdir(tgtdir + '/templates/layouts');
    this.mkdir(tgtdir + '/templates/views');
    this.template('dustjs/data/_website.json',tgtdir + '/templates/data/website.json',context);
    this.template('dustjs/includes/_head.html',tgtdir + '/templates/includes/head.html',context);
    this.template('dustjs/includes/_scripts.html',tgtdir + '/templates/includes/scripts.html',context);
    this.copy('dustjs/layouts/master.html',tgtdir + '/templates/layouts/master.html');
    this.template('dustjs/views/_index.html',tgtdir + '/templates/views/index.html',context);

  },

  configfiles: function() {
    var tgtdir = this.answers.root,
        context = this.answers;
    //this.copy('.bowerrc',tgtdir + '/.bowerrc');
    this.template('_Gruntfile.js',tgtdir + '/Gruntfile.js',context);
    this.template('_package.json', tgtdir + '/package.json',context);
    //this.template('_bower.json', tgtdir + '/bower.json',context);
    this.template('_.jshintrc', tgtdir + '/.jshintrc',context);
    this.template('_.editorconfig', tgtdir + '/.editorconfig',context);
    this.template('_.buildconfig', tgtdir + '/.buildconfig',context);
  },

  icons: function() {
    var tgtdir = this.answers.root,
        context = this.answers;

    if (!context.hasFontAwesome) { return; }
	this.mkdir(tgtdir + '/components');
	this.mkdir(tgtdir + '/components/icons');
	this.directory('icons/html',tgtdir + '/components/icons/html');
	this.directory('icons/svg',tgtdir + '/components/icons/svg');
	this.directory('icons/' + context.preProcessorExt,tgtdir + '/components/icons/' + context.preProcessorExt);
	
    // this.template('icons/_icons-sample.json',tgtdir + '/icons/'+ context.appNameSlug + '.json',context);
    // this.copy('less/global/icons.less',tgtdir + '/less/global/icons.less');
  }

});

module.exports = BrfeboilerplateGenerator;
