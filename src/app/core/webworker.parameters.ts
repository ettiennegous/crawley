//WebWorker Result
export class WWRes implements  IWWRes {
    url: string;
    baseURL: string;
    html: string;
    status: string;

    constructor(url: string, baseURL: string, html: string, status: string) {
        this.url = url;
        this.baseURL = baseURL;
        this.html = html;
        this.status = status;
    }
}

//WebWorker Request
export class WWReq implements IWWReq {
    url: string;
    baseURL: string;
    constructor(url: string, baseURL: string) {
        this.url = url;
        this.baseURL = baseURL;
    }
}

export interface IWWReq {
    url: string
    baseURL: string
}

export interface IWWRes {
    url: string, 
    baseURL: string,
    html: string,
    status: string
}

