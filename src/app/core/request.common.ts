import { IWWReq } from './webworker.parameters'

export interface IRequest {
    Skip(baseURL: string, url: string, callBack: Function) : void;
    Crawl(input : IWWReq ,callBack: (response1: object) => void) : void;
}
