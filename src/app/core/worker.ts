// import { Net } from './net';
// new Net()

//const Net = require('./net.js').Net
//var net = new Net()

// const ThrottleDelayMS = 2000


// addEventListener('message', (message) => {
//     console.log('in webworker', message);
//     postMessage('this is the response ' + message.data);
//     var args = message.data;
//     this.sleep(ThrottleDelayMS).then(() => {
//         console.log('Crawling stuff ' + args.baseURL + ' ' + args.url);
//         //net.Crawl(args.baseURL, args.url, pageCrawlComplete.bind(this))
//     });
// });


// function sleep(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }


// function pageCrawlComplete(baseURL: string, url: string, content: string, statusCode: string) {
//     postMessage({baseURL: baseURL, url: url, content: content, statusCode: statusCode}); 
// }