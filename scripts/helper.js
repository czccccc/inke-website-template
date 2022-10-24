const fs = require('fs');
const { resolve } = require('path');

const getInputOption = (path) => {
  const option = {};
  fs.readdirSync(path)
    .filter((fileName) => fileName.split('.')[1] == 'html')
    .forEach((fileName) => {
      option[fileName.split('.')[0]] = resolve(path, `${fileName}`);
    });
  return option;
};

const createDir = (pathStr) => {
  const dirTree = [];
  (pathStr + '/').split('').reduce((str, curChar) => {
    if (curChar === '/' && str) {
      dirTree.push(str);
    }
    return str + curChar;
  }, '');
  dirTree.forEach((dirName) => {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
  });
};

const copyDir = (copyStr, targetStr) => {
  createDir(targetStr);
  const files = fs.readdirSync(copyStr);
  files.forEach((fileName) => {
    if (fs.statSync(`${copyStr}/${fileName}`).isDirectory()) {
      copyDir(`${copyStr}/${fileName}`, `${targetStr}/${fileName}`);
    } else {
      copyFile(`${copyStr}/${fileName}`, `${targetStr}/${fileName}`);
    }
  });
};

const copyFile = (copyStr, targetStr) => {
  if (copyStr.includes('.DS_Store')) {
    return;
  }
  const readData = fs.readFileSync(copyStr, 'utf-8');
  fs.writeFileSync(targetStr, readData);
};

const copy = (copyStr, targetStr) => {
  if (fs.statSync(copyStr).isDirectory()) {
    copyDir(copyStr, targetStr);
  } else {
    copyFile(copyStr, targetStr);
  }
};

module.exports = {
  getInputOption,
  copy,
};
