var Logger = function() {};
Logger.prototype.logInfo = function(url, msg) {
    console.log(url, msg)
    var li = this.createOrFindElement(url)
    li.innerHTML = url + ' ' + msg
    
    console.log(li)
    //outputElem.innerHTML += msg
    //outputElem.innerHTML += "<br/>"

}

Logger.prototype.createOrFindElement = function(url) {
    const outputElem = document.getElementById("output")
    const elemID = 'status_' + url
    var elem = document.getElementById(elemID);
    if(!elem) {
      var newLI = document.createElement("LI");
      newLI.setAttribute("id",elemID)
      outputElem.appendChild(newLI)
      return newLI
    }
    else 
    {
      console.log('found', elem)
      return elem;
    }
}


exports.Logger = Logger;