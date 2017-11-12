class Logger {
    logInfo(url, msg) {
        var li = this.createOrFindElement(url)
        li.innerHTML = '<td></td><td>' + url + '</td><td>' + msg + '</td><td></td>'        
    }

    createOrFindElement(url) {
        const outputElem = document.getElementById("output")
        const elemID = 'status_' + url
        var elem = document.getElementById(elemID);
        if(!elem) {
            var newTR = document.createElement("tr");
            newTR.setAttribute("id",elemID)
            outputElem.appendChild(newTR)
            return newTR
        }
        else {
            return elem;
        }
    }
}


exports.Logger = Logger;