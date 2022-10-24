const { createServer } = require('vite');
const chalk = require('chalk');
const { devSrcPath, configs } = require('./config');
const { resolve } = require('path');
const { getInputOption } = require('./helper');

const log = console.log;

(async () => {
  const server = await createServer({
    configFile: false,
    root: devSrcPath,
  });
  await server.listen();
  const { port } = server.config.server;
  configs.forEach((config) => {
    log(`${config.input}:`);
    Object.keys(
      getInputOption(resolve(devSrcPath, 'website', config.input))
    ).forEach((entry) => {
      const url = `http://localhost:${port}/website/${config.input}/${entry}.html`;
      log(chalk.blueBright(`${entry}:${url}`));
    });
    log('----------------------------------');
  });
})();
