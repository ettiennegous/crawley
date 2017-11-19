const Net = require('./net.js').Net
var net = new Net()
const ThrottleDelayMS = 2000

self.onmessage = function(event) {
    var args = event.data;
    this.sleep(ThrottleDelayMS).then(() => {
        net.Crawl(args.baseURL, args.url, this.pageCrawlComplete.bind(this))
    });
};

self.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


self.pageCrawlComplete = function(baseURL, url, content, statusCode) {
    self.postMessage({baseURL: baseURL, url: url, content: content, statusCode: statusCode}); 
}

