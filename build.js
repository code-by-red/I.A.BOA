const fs = require('fs');
const path = require('path');

const files = ['index.html', 'sobre.html', 'tutorial.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace placeholder with environment variable
    content = content.replace(/%%APPSCRIPT_URL%%/g, process.env.APPSCRIPT_URL || '');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
