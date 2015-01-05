require.config({

  deps: ['main'],

  paths: {
    jquery: '../bower_components/jquery/dist/jquery'<% if (includeBootstrap) { %>,
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'<% } %><% if (includeUnderscore) { %>,
    underscore: '../bower_components/underscore/underscore'<% } %>
  },

  shim: {
    jquery: {
      exports: 'jquery'
    }<% if (includeUnderscore) { %>,
    underscore: {
      exports: '_'
    }<% } %><% if (includeBootstrap) { %>,
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }<% } %>
  }

});