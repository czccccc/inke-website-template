const { resolve } = require('path');

const buildSrcPath = resolve(__dirname, '../src/website');
const devSrcPath = resolve(__dirname, '../src');

const configs = [
  // {
  //   input: 'demo',
  //   output: 'demo',
  //   静态文件 支持文件夹
  //   static: 'app-ads.txt',
  //   static: [
  //     'app-ads.txt',
  //     {
  //       input: 'a',
  //       output: 'b',
  //     },
  //   ],
  // },
];

module.exports = {
  buildSrcPath,
  devSrcPath,
  configs,
};
