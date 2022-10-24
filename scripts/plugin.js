const { minify } = require('html-minifier-terser');
const legacy = require('@vitejs/plugin-legacy');
const { resolve } = require('path');
const { copy } = require('./helper');

const htmlMinify = () => {
  return {
    name: 'html-minify',
    transformIndexHtml(html) {
      return minify(html, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        maxLineLength: 9999,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      });
    },
  };
};

const packStatic = (rootPath, static) => {
  return {
    name: 'pack-static',
    writeBundle(outputOptions) {
      if (!Array.isArray(static)) {
        static = [static];
      }
      static.forEach &&
        static.forEach((item) => {
          copy(
            resolve(rootPath, item.input || item),
            resolve(outputOptions.dir, item.output || item)
          );
        });
    },
  };
};

module.exports = {
  legacy,
  htmlMinify,
  packStatic,
};
