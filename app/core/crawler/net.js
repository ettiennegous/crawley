// console.log('xxxxx', require('electron'))
// const {net} = require('electron').remote

class Net {
     Skip(baseURL, url, callBack) {
      callBack(baseURL, url, null, 'skipped')
     }
     
     Crawl(baseURL, url, callBack) {
      var status = null;
      fetch(url)
      .then(function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
          }
          status = response.status;
          return response.text()
        }).then(function(html) {
          callBack(baseURL, url, `${html}`, status)
        });
     }
}


exports.Net = Net;