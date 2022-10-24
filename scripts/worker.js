const { Worker, isMainThread, parentPort } = require('worker_threads');
const os = require('os');

class Workers {
  static taskList = [];

  constructor(list) {
    this.taskList = list;
    this.workerList = new Array(
      Math.min(os.cpus().length, this.taskList.length)
    ).fill({});
    this.create();
  }

  create() {
    this.workerList.forEach((_, index) => {
      this.workerList[index] = new Worker(__filename);
    });
  }

  runTask() {
    return Promise.all(
      this.workerList.map((worker, id) => {
        return new Promise((resolve, reject) => {
          let round = 1;
          this.postTask(id, round, worker);
          worker.on('message', (result) => {
            if (!result) {
              return resolve();
            }
            round++;
            this.postTask(id, round, worker);
          });
          worker.on('error', (err) => {
            reject(err);
          });
        });
      })
    );
  }

  postTask(id, round, worker) {
    const taskId = id + this.workerList.length * (round - 1);
    worker.postMessage(taskId);
  }
}

if (!isMainThread) {
  console.log(Workers.taskList);
  parentPort.on('message', async (taskId) => {
    if (Workers.taskList[taskId]) {
      await Workers.taskList[taskId];
      parentPort.postMessage(true);
    } else {
      parentPort.postMessage(false);
    }
  });
}

module.exports = Workers;
