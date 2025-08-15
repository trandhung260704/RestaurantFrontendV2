"use strict";

var fs = require('fs');

var path = require('path');

var files = ['src/customer.js', 'src/employee.js', 'src/manageOrder.js', 'src/order.js', 'src/Ingredient.js'];
files.forEach(function (file) {
  var filePath = path.join(__dirname, file);
  var content = fs.readFileSync(filePath, 'utf8'); // Remove unused useNavigate import

  content = content.replace(/import \{ useNavigate \} from 'react-router-dom';\n/g, '');
  fs.writeFileSync(filePath, content);
  console.log("Fixed ".concat(file));
});