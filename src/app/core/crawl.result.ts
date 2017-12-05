import * as Enums from './enums';

export class CrawlResult { 
    url: string;
    httpCode: string;
    status: Enums.ResultState;
    
    constructor() {}

}
