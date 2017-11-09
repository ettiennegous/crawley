
function requestPage(URL) {
    console.log('xxx', URL)
    postMessage(URL + ' done');
    // remote.session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    //     details.requestHeaders['User-Agent'] = 'MyAgent'
    //     callback({cancel: false, requestHeaders: details.requestHeaders})
    //   })
}

onmessage = function(e) {
    requestPage(e.data);
};

