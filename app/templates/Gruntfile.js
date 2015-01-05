'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({

    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'app/scripts/config.js',
          baseUrl: 'app/scripts',
          out: 'build/scripts/main.js',
          include: ['main'],
          name: '../bower_components/almond/almond',
          almond: true,
          replaceRequireScript: [{
            files: ['build/index.html'],
            module: 'main',
            modulePath: 'scripts/main'
          }]         
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'build/*'
          ]
        }]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'build'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['build/{,*/}*.html'],
      css: ['build/styles/{,*/}*.css'],
      options: {
        dest: ['build']
      }
    },

    // cssmin: {
    //   dist: {
    //     files: {
    //       'build/styles/main.css': [
    //         'app/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },    

    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'build',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'images/{,*/}*.{webp,gif}',
              '{,*/}*.html'
            ]
          }<% if (includeBootstrap) { %>,
          {
            expand: true,
            dot: true,
            cwd: 'app/bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: 'build/styles/vendor/bootstrap'
          }<% } %>
        ]
      }
    },<% if (includeModernizr) { %>

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'app/bower_components/modernizr/modernizr.js',
        outputFile: 'build/scripts/vendor/modernizr.js',
        files: {
          src: [
            'build/scripts/{,*/}*.js',
            'build/styles/{,*/}*.css',
            '!build/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },<% } %><% if (includeLess) { %>
    less: {
      development: {
        options: {
          paths: ['app/less']
        },
        files: [{
          expand: true,
          cwd: 'app/less',
          src: '*.less',
          dest: 'app/styles',
          ext: '.css'
        }]
      }    
    },<% } %>
    watch: {<% if (includeLess) { %>
      files: 'app/less/*.less',
      tasks: ['less']
    <% } %>}
  });

  // Registering task(s)
  grunt.registerTask('build', [
    'clean',
    'copy',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'usemin',
    'requirejs'<% if (includeModernizr) { %>,
    'modernizr'<% } %>
  ]);

  // Default task(s)
  grunt.registerTask('default', ['build']);

};