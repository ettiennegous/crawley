class WorkerThread {
    constructor(parentPool) {
        this.parentPool = parentPool;
        this.workerTask = {};    
    }

    run(workerTask) {
        this.workerTask = workerTask;
        // create a new web worker
        if (this.workerTask.script!= null) {
            var worker = new Worker(workerTask.script);
            worker.addEventListener('message', dummyCallback, false);
            worker.postMessage(workerTask.startMessage);
        }
    }
 
    // for now assume we only get a single callback from a worker
    // which also indicates the end of this worker.
    dummyCallback(event) {
        // pass to original callback
        _this.workerTask.callback(event);
 
        // we should use a seperate thread to add the worker
        _this.parentPool.freeWorkerThread(_this);
    }

}

exports.WorkerThread = WorkerThread;