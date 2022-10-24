const { Worker } = require('worker_threads');
const os = require('os');
const chalk = require('chalk');

const { resolve } = require('path');
const log = console.log;

class BuildWorkers {
  constructor(list) {
    this.configList = list;
    this.workerList = new Array(
      Math.min(os.cpus().length, this.configList.length)
    ).fill({});
    this.create();
  }

  create() {
    this.workerList.forEach((_, index) => {
      this.workerList[index] = new Worker(resolve(__dirname, './worker.js'));
    });
  }

  runTask() {
    return Promise.all(
      this.workerList.map((worker, id) => {
        return new Promise((resolve, reject) => {
          let round = 1;
          this.postTask(id, round, worker, resolve);
          worker.on('message', (msg) => {
            log(chalk.blueBright(msg));
            log(chalk.blueBright('----------------------------------'));
            round++;
            this.postTask(id, round, worker, resolve);
          });
          worker.on('error', (err) => {
            log(err.msg);
            reject(err.error);
          });
        });
      })
    );
  }

  postTask(id, round, worker, resolve) {
    const configId = id + this.workerList.length * (round - 1);
    if (!this.configList[configId]) {
      return resolve();
    }
    worker.postMessage(this.configList[configId]);
    log(chalk.blueBright(`Building ${this.configList[configId].input}...`));
    log(chalk.blueBright('----------------------------------'));
  }
}

module.exports = BuildWorkers;
