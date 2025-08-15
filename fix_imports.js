const fs = require('fs');
const path = require('path');

const files = [
  'src/customer.js',
  'src/employee.js', 
  'src/manageOrder.js',
  'src/order.js',
  'src/Ingredient.js'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove unused useNavigate import
  content = content.replace(/import \{ useNavigate \} from 'react-router-dom';\n/g, '');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
}); 