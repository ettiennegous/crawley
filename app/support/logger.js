class Logger {

    constructor() {
        this.rowIDPrefix = 'tr';
    }

    resetResults()
    {
        $('#output').html('<tr></tr>');
    }
    
    entryExists(url) {
        return $('#' + this.rowIDPrefix + this.parseHTMLID(url)).length > 0;
    }
    
    createEntry(url) {
        $('#output tr:last').after('<tr id="'+ this.rowIDPrefix + this.parseHTMLID(url) + '"><td>' + url + '</td><td>Pending</td><td></td></tr>');
    }
    
    updateEntry(url, status, response) {
        $('#' + this.rowIDPrefix + this.parseHTMLID(url)).find("td").eq(1).html(status);
        $('#' + this.rowIDPrefix + this.parseHTMLID(url)).find("td").eq(2).html(response);
    }
    
    parseHTMLID(url) {
        return url.replace(/([^A-Za-z0-9[\]{}_-])\s?/g, '')
    }

    updateStats(totalCount, completeCount) {
        $('#progress').text(completeCount + '/' + totalCount)
    }
}


exports.Logger = Logger;