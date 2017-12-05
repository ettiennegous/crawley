import { IWWReq, IWWRes, WWRes } from './webworker.parameters'

export class Net {
    Skip(baseURL: string, url: string, callBack: Function) {
        callBack(baseURL, url, null, 'skipped')
    }


    Crawl(input :IWWReq ,callBack: (response1: object) => void) : void {
        var status = null;
        fetch(input.url)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                }
                status = response.status;
                return response.text()
            }).then(function (html) {
                callBack({url: input.url, baseURL: input.baseURL, html: `${html}`, status: status});//new WWRes(input.url, input.baseURL, , status));
            });        
    }

}
