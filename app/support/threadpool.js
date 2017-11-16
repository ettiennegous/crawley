const WorkerThread = require('../support/workerthread.js').WorkerThread

class ThreadPool {

    constructor(size) {
        this.taskQueue = [];
        this.workerQueue = [];
        this.poolSize = size;
         
    }
    
    
    addWorkerTask(workerTask) {
        if (this.workerQueue.length > 0) {
            // get the worker from the front of the queue
            var workerThread = _this.workerQueue.shift();
            workerThread.run(workerTask);
        } else {
            // no free workers,
            this.taskQueue.push(workerTask);
        }
    }
    
    init() {
        // create 'size' number of worker threads
        for (var i = 0 ; i < size ; i++) {
            this.workerQueue.push(new WorkerThread(this));
        }
    }
    
    freeWorkerThread(workerThread) {
        if (this.taskQueue.length > 0) {
            // don't put back in queue, but execute next task
            var workerTask = this.taskQueue.shift();
            workerThread.run(workerTask);
        } else {
            this.workerQueue.push(workerThread);
        }
    }

}

exports.ThreadPool = ThreadPool;