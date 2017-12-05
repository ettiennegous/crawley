import { IWWReq } from './webworker.parameters'

export class WorkerTask {
    callback: Function;
    startMessage: IWWReq;

    constructor(callback: Function, msg : IWWReq) {
        this.callback = callback;
        this.startMessage = msg;
    }
};