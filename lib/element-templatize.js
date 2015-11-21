var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(options) {
  var elementRoots = {};
  var elementTagNames = Object.keys(options.templatePaths);
  var $ = cheerio.load(options.html);

  var traverse = function(elementRoots, elem) {
    if (elementTagNames.indexOf(elem.tagName) > -1 && !elementRoots[elem.tagName]) {
      var root = $(elem).clone();
      elementRoots[elem.tagName] = root;
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
    // TODO format
    fs.writeFile(options.templatePaths[tagName], $(elementRoots[tagName]).html(), function(err) {
      if (err) {
        console.error(err);
      }
    });
    console.log(tagName);
    console.log($(elementRoots[tagName]).html());
    console.log('---');
  }
};
