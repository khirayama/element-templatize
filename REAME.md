# element-templatize

## Sample code

```javascript
const elementTemplatize = require('element-templatize');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <x>
    <p>header</p>
    <ul>
      <y>
        <li>great <z><span>apple</span></z></li>
      </y>
      <li>peach</li>
      <li>banana</li>
    </ul>
  </x>
</body>
</html>
`;

elementTemplatize({
  html: html,
  templatePaths: {
    'x': __dirname+'/templates/x.html',
    'y': __dirname+'/templates/y.html',
    'z': __dirname+'/templates/z.html'
  }
});
```
