'use strict()';

//include build settings
var settings = require('./.buildconfig');

module.exports = function(grunt) {      

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
	
	// Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
	
    //load grunt tasks from separate chunks
    var configs = require('load-grunt-configs')(grunt, {
        config: {
            src: settings.grunttasks + '*.js'
        },
        paths: settings.paths,
        //server: settings.server,
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.initConfig(configs);

    // this task lints and compiles script files only
    grunt.registerTask("scripts", [
        "jshint",
        "webpack:dev"
        ]);
    // this task minifies styles
    grunt.registerTask("styles", ["<%= preProcessorLang %>:dev"]);	

    <% if (hasFontAwesome) { %>
     //this task generates iconfonts
    grunt.registerTask("icons",["webfont","<%= preProcessorLang %>:dev"]);
    <% } %>

    //grunt default will lint script and concat script files, minify modernizr, compile less for dev
    grunt.registerTask("dev", [
        "clean",
        "copy:dist",
        "modernizr",
        <% if (dustjs) { %>"dusthtml",<% } %>
        "scripts",
		<% if (hasFontAwesome) { %>"icons",<% } %>
        "<%= preProcessorLang %>:dev",
        <% if (Webserver === 'browsersync') { %>"browserSync:dev",<% } %>
        <% if (Webserver === 'connect') { %>"connect:dev",<% } %>
        "watch"
    ]);
	grunt.registerTask("default", ["dev"]);
	
    // this task packages all files for production
    grunt.registerTask("prodbuild", [
        "clean",
        "copy:dist",
        "modernizr",
        <% if (dustjs) { %>"dusthtml",<% } %>
        "webpack:prod",
		<% if (hasFontAwesome) { %>"icons",<% } %>
        "<%= preProcessorLang %>:prod",
        "cmq:prod",
        "cssmin:prod",
        // "imagemin:prod" << issue on installing grunt-contrib-imagemin, disable for now
		"copy:prod"
    ]);
	
    // this task runs prodbuild on dist
    grunt.registerTask("prod", [
        "prodbuild",
        <% if (Webserver === 'browsersync') { %>"browserSync:prod",<% } %>
        <% if (Webserver === 'connect') { %>"connect:prod",<% } %>
        "watch"
    ]);
    
};