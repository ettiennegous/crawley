// console.log('xxxxx', require('electron'))
// const {net} = require('electron').remote

class Net {
     Skip(baseURL, url, callBack) {
      callBack(baseURL, url, null, 'skipped')
     }
     
     Crawl(baseURL, url, callBack) {

      fetch(url)
      .then(function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          return response.text();
        }
        ).then(function(html){
          var patt = /<a href="(.*?)"/g;
          var links = '';
          var match;
          while(match=patt.exec(`${html}`)){
            links += match[1] + "\n" 
          }    
          //console.log('Links ', links);
          callBack(baseURL, url, links, 'done')    
          // Examine the text in the response
          //  response.json().then(function(data) {
          //    console.log(data);
          //  });

        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });

    //   const request = net.request(url)
    //   request.on('response', (response) => {
    //     var responseData = '';
    //     response.on('data', (chunk) => {
    //       responseData += `${chunk}`
    //     })
    //     response.on('end', () => {
    //     })
    //   })
    //   request.end()
     }
}


exports.Net = Net;