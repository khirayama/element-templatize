var fs = require('fs');
var html = require('html');
var cheerio = require('cheerio');

module.exports = function(options) {
  var elementRoots = {};
  var elementTagNames = Object.keys(options.templatePaths);
  var $ = cheerio.load(options.html);

  var traverse = function(elementRoots, elem) {
    if (elementTagNames.indexOf(elem.tagName) > -1) {
      var root = $(elem).clone();
      if (!elementRoots[elem.tagName]) {
        elementRoots[elem.tagName] = root;
      }
      $(elem).html('');
      root.children().each(function(i, elm) {
        traverse(elementRoots, elm);
      });
    } else {
      $(elem).children().each(function(i, elm) {
        traverse(elementRoots, elm);
      });
    }
  };

  $('body').children().each(function(i, elem) {
    traverse(elementRoots, elem);
  });
  var tagName;
  for (tagName in elementRoots) {
    var prettied = html.prettyPrint($(elementRoots[tagName]).html(), {indent_size: 2});
    fs.writeFile(options.templatePaths[tagName], prettied, function(err) {
      if (err) {
        console.error(err);
      }
    });
  }
};
