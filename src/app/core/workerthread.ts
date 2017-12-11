import { WorkerTask } from './workertask';
import { ThreadPool } from './threadpool';
import { createWorker, ITypedWorker } from 'typed-web-workers'
import { IWWReq, IWWRes, WWReq } from './webworker.parameters'
import { RequestHttp as Fetcher }  from './request.http'

export class WorkerThread {

    parentPool: ThreadPool;
    workerTask: WorkerTask;

    constructor(parentPool : ThreadPool) {
        this.parentPool = parentPool;
        this.workerTask = null;    
    }

    run(workerTask) : void {
        this.workerTask = workerTask;
        let fetcher = new Fetcher();
        let typedWorker: ITypedWorker<IWWReq, IWWRes> = createWorker(fetcher.Crawl, this.callBack.bind(this));
        typedWorker.postMessage(this.workerTask.startMessage);
    }

    callBack(response: IWWRes): void {
        this.workerTask.callback(response); 
        this.parentPool.freeWorkerThread(this);
        
    } 

}


