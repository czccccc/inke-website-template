const chalk = require('chalk');

const { configs } = require('./config');
const BuildWorkers = require('./worker/main');

const log = console.log;

async function build() {
  const workers = new BuildWorkers(configs);
  log(chalk.white(`Building start!`));
  log('----------------------------------');
  try {
    await workers.runTask();
    log(chalk.white(`Building all success!`));
    log('----------------------------------');
    process.exit(0);
  } catch (error) {
    log(error);
    log(chalk.red(`Building failed!`));
    process.exit(1);
  }
}

build();
