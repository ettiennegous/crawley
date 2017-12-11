import { IWWReq, IWWRes, WWRes } from './webworker.parameters'
import { IRequest } from './request.common'

export class RequestPhantom implements IRequest {
    Skip(baseURL: string, url: string, callBack: Function) : void {

    }

    Crawl(input: IWWReq ,callBack: (response1: object) => void) : void {
    }   
}