import { WorkerTask } from './workertask';
import { ThreadPool } from './threadpool';
import { createWorker, ITypedWorker } from 'typed-web-workers'
import { IWWReq, IWWRes, WWReq } from './webworker.parameters'
import { Net } from './net'

export class WorkerThread {

    parentPool: ThreadPool;
    workerTask: WorkerTask;

    constructor(parentPool : ThreadPool) {
        this.parentPool = parentPool;
        this.workerTask = null;    
    }

    run(workerTask) : void {
        this.workerTask = workerTask;
        let net = new Net();
        let typedWorker: ITypedWorker<IWWReq, IWWRes> = createWorker(net.Crawl, this.callBack.bind(this));
        typedWorker.postMessage(this.workerTask.startMessage);
    }

    callBack(response: IWWRes): void {
        this.workerTask.callback(response); 
        this.parentPool.freeWorkerThread(this);
        
    } 

}


