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

    resetResults() {
        $('#output').html('<tr></tr>');
    }

    entryExists(url) {
        return $('#' + this.rowIDPrefix + this.parseHTMLID(url)).length > 0;
    }

    createEntry(url) {
        $('#output tr:last').after('<tr id="' + this.rowIDPrefix + this.parseHTMLID(url) + '" class="' + this.getEntryStateClass(this.rowState.pending) + '"><td>' + url + '</td><td></td><td>' + this.rowState.pending + '</td></tr>');
    }

    updateEntry(url, status, statusCode) {

        //Duplicated need to fix
        var tr = $('#' + this.rowIDPrefix + this.parseHTMLID(url));
        tr.find('td').eq(1).html(statusCode);
        tr.find('td').eq(2).html(status);
        tr.attr('class', this.getEntryStateClass(status));
    }

    findUrlsOfStatus(status) {
        var urls = [];
        $('#output tr').each(function (element) {
            if ($(this).find("td").eq(2).text() == status) {
                urls.push($(this).find("td").eq(0).text());
            }
        });
        return urls;
    }

    updateEntries(oldStatus, newStatus) {
        this.findUrlsOfStatus(oldStatus).forEach(function(element) {
            this.updateEntry(element, newStatus, '');
        }.bind(this))
    }

    getEntryStateClass(status) {
        switch (status) {
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
        var percentComplete = totalCount > 0 ? ((completeCount / totalCount) * totalCount) : 0;
        $('#progText').text(completeCount + '/' + totalCount)
        $('#progBar').css({ 'width': + '%' })

    }
}


exports.Logger = Logger;