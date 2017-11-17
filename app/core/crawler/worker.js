const Net = require('./net.js').Net
var net = new Net()
self.onmessage = function(event) {
    var args = event.data;
    net.Crawl(args.baseURL, args.url, this.pageCrawlComplete.bind(this))
};

self.pageCrawlComplete = function(baseURL, url, content, statusCode) {
    self.postMessage({baseURL: baseURL, url: url, content: content, statusCode: statusCode}); 
 }

