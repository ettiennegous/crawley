var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var path = require('path')
var binPath = phantomjs.path
class Phantom {
    phantomCrawl(url) {
      var childArgs = [path.join(__dirname, 'phantom_urls.js'), url]
      childProcess.execFile(binPath, childArgs, crawlComplete)
    }
    
}


exports.Phantom = Phantom;