var fs = require('fs');
var elementTemplatize = require('../lib/element-templatize');

var html = fs.readFileSync(__dirname+'/target.html').toString();

elementTemplatize({
  html: html,
  templatePaths: {
    'x': __dirname+'/templates/x.html',
    'y': __dirname+'/templates/y.html',
    'z': __dirname+'/templates/z.html'
  }
});

// or

//elementTemplatize({
  //url: 'http://localhost:8000/target.html',
  //templatePaths: {
    //'a': './templates/a.html',
    //'b': './templates/b.html',
    //'c': './templates/c.html'
  //},
  //overwrite: true
//});
