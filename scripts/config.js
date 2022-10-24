const { resolve } = require('path');

const buildSrcPath = resolve(__dirname, '../src/website');
const devSrcPath = resolve(__dirname, '../src');

const configs = [
  // {
  //   input: 'happychat',
  //   output: 'happychat',
  // },
  {
    input: 'happychat2',
    output: 'happychat21212121',
    // static: [
    //   'app-ads.txt',
    //   {
    //     input: 'a',
    //     output: 'b',
    //   },
    // ],
    static: 'app-ads.txt',
  },
];

module.exports = {
  buildSrcPath,
  devSrcPath,
  configs,
};
