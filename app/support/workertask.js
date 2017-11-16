// task to run
class WorkerTask {
    constructor(script, callback, msg) {
        this.script = script;
        this.callback = callback;
        this.startMessage = msg;
    }
};

exports.WorkerTask = WorkerTask;
