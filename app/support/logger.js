class Logger {

    constructor() {
        this.rowIDPrefix = 'tr';
        this.rowState = {
            pending: "pending", 
            paused: "paused",
            error: "error",
            done: "done"
        };

    }

    resetResults()
    {
        $('#output').html('<tr></tr>');
    }
    
    entryExists(url) {
        return $('#' + this.rowIDPrefix + this.parseHTMLID(url)).length > 0;
    }
    
    createEntry(url) {
        $('#output tr:last').after('<tr id="'+ this.rowIDPrefix + this.parseHTMLID(url) + '" class="' + this.getEntryStateClass(this.rowState.pending) + '"><td>' + url + '</td><td></td><td>Pending</td></tr>');
    }
    
    updateEntry(url, status, statusCode) {

        //Duplicated need to fix
        var tr = $('#' + this.rowIDPrefix + this.parseHTMLID(url));
        tr.find('td').eq(1).html(statusCode);
        tr.find('td').eq(2).html(status);
        tr.attr('class', this.getEntryStateClass(status));
    }

    getEntryStateClass(status) {
        switch(status) {
            case this.rowState.pending:
                return 'table-primary'
            break;
            case this.rowState.paused:
                return 'table-warning'
            break;
            case this.rowState.error:
                return 'table-danger'
            break;
            case this.rowState.done:
                return 'table-success'
            break;
        }
    }
    
    parseHTMLID(url) {
        return url.replace(/([^A-Za-z0-9[\]{}_-])\s?/g, '')
    }

    updateStats(totalCount, completeCount) {
        $('#progress').text(completeCount + '/' + totalCount)
    }
}


exports.Logger = Logger;