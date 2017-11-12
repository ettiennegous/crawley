const {net} = require('electron').remote

class Net {
    Crawl(baseURL, url, callBack) {
      const request = net.request(url)
      request.on('response', (response) => {
        var responseData = '';
        response.on('data', (chunk) => {
          responseData += `${chunk}`
        })
        response.on('end', () => {
          var patt = /<a href="(.*?)"/g;
          var links = '';
          var match;
          while(match=patt.exec(responseData)){
            links += match[1] + "\n" 
          }    
          callBack(baseURL, url, links)
        })
      })
      request.end()
    }
}


exports.Net = Net;