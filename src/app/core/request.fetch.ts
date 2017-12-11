import { IWWReq, IWWRes, WWRes } from './webworker.parameters'
import { IRequest } from './request.common'

export class RequestFetch implements IRequest {

    constructor() {

    }

    Skip(baseURL: string, url: string, callBack: Function) : void {
        callBack(baseURL, url, null, 'skipped')
    }


    Crawl(input: IWWReq ,callBack: (response1: object) => void) : void {
        var status = null;
        fetch(input.url, {
            method: 'GET', 
            mode: 'cors', 
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })})
            .then(function (response) {
                if (response.status !== 200) {
                    self.console.log('Looks like there was a problem. Status Code: ' + response.status);                   
                }
                self.console.log(response);
                
                status = response.status;
                return response.text()
            })

            .then(function (html) {
                callBack({url: input.url, baseURL: input.baseURL, html: `${html}`, status: status});//new WWRes(input.url, input.baseURL, , status));
            })
            .catch(function(error) {
                self.console.log('There has been a problem with your fetch operation: ', error.message);
            });
    } 

}
