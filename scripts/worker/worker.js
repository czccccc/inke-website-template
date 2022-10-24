const { parentPort } = require('worker_threads');
const { build, defineConfig } = require('vite');
const { resolve } = require('path');
const { htmlMinify, packStatic, legacy } = require('../plugin');
const { buildSrcPath } = require('../config');
const { getInputOption } = require('../helper');

const resolveConfig = (config) => {
  const rootPath = resolve(buildSrcPath, config.input);
  return defineConfig({
    root: rootPath,
    logLevel: 'error',
    build: {
      minify: 'terser',
      assetsDir: 'js',
      outDir: resolve('dist', config.output),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          ...getInputOption(rootPath),
        },
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.')[1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `image/[name]-[hash][extname]`;
            }
            return `${extType}/[name]-[hash][extname]`;
          },
        },
      },
    },
    plugins: [
      {
        ...packStatic(rootPath, config.static),
        apply: 'build',
      },
      htmlMinify(),
      legacy({
        targets: ['defaults', 'not IE 11'],
        modernPolyfills: true,
        renderLegacyChunks: true,
      }),
    ],
  });
};

parentPort.on('message', async (config) => {
  try {
    await build(resolveConfig(config));
    parentPort.postMessage(
      `Building ${config.input} success! output:${config.output}`
    );
  } catch (error) {
    throw { error, msg: `Building ${config.input} failed!` };
  }
});
