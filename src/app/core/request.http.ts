import { IWWReq, IWWRes, WWRes } from './webworker.parameters'
import { IRequest } from './request.common'
const url = require('url')
const http = require('http')
self.console.log(url) //<- Url is defined

export class RequestHttp implements IRequest {

    constructor() {

    }

    Skip(baseURL: string, url: string, callBack: Function): void {
        callBack(baseURL, url, null, 'skipped')
    }


    Crawl(input: IWWReq, callBack: (response1: object) => void): void {
        
        self.console.log(url); // <- Url is NOT undefined
        let urlParts = url.parse(input.url)
        let options = {
            host: urlParts.hostname,
            port: urlParts.port,
            path: urlParts.path,
            method: 'GET'
        };

        let request = http.request(options, function (response) {
            self.console.log('STATUS: ' + response.statusCode);
            self.console.log('HEADERS: ' + JSON.stringify(response.headers));
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                self.console.log('BODY: ' + chunk);
                //callBack({url: input.url, baseURL: input.baseURL, html: `${html}`, status: status});//new WWRes(input.url, input.baseURL, , status));
            });
        });
        request.on('error', function(error) {
            self.console.log('There has been a problem with your fetch operation: ', error.message);
        });
        request.end();
    }

}
