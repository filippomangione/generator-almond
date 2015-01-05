require([
  'jquery'<% if (includeUnderscore) { %>,
  'underscore'<% } %><% if (includeBootstrap) { %>,
  'bootstrap'<% } %>
],
function ($<% if (includeUnderscore) { %>, _<% } %>) {
  'use strict';

});