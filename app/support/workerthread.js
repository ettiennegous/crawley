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
            worker.addEventListener('message', this.dummyCallback.bind(this), false);
            worker.postMessage(this.workerTask.startMessage);
        }
    }
 
    // for now assume we only get a single callback from a worker
    // which also indicates the end of this worker.
    dummyCallback(event) {
        // pass to original callback
        this.workerTask.callback(event);
 
        // we should use a seperate thread to add the worker
        this.parentPool.freeWorkerThread(this);
    }

}

exports.WorkerThread = WorkerThread;