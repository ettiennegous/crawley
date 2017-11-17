class StrHelper {

    static cleanLinks(baseURL, linksArray) {
        var filterFunc = (function(link) {
            link = link.toLowerCase()
            if(this.isEmptyLink(link)) return false
            if(!this.isValidLink(baseURL, link)) return false
            if(this.isTelephoneLink(link)) return false
            if(this.isExternalLink(baseURL, link)) return false
            return true
        }.bind(this))

        var mapFunc = (function(link) {
            return this.prefixDomain(baseURL, link); 
        }.bind(this))
        
        return linksArray.filter(filterFunc).map(mapFunc);
    }

    static prefixDomain(baseURL, link) {
        return (!link.startsWith("http")) ? baseURL + link : link
    }

    static isExternalLink(baseURL, link) {
        return link.startsWith("http") && !link.startsWith(baseURL);
    }

    static isValidLink(baseURL, link) {
        return link.startsWith("http") || this.isURL(baseURL + link)
    }

    static isTelephoneLink(link) {
        return link.startsWith('tel:')
    }

    static isEmptyLink(link) {
        return link.trim() == ''
    }

    static getLinksFromContent(content) {
        var links = [];
        const patt = /<a href="(.*?)"/g;
        var match;
        while(match=patt.exec(content)) {
            links.push(match[1])
        }
        return links
    }

    static isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }

    static splitLines(content) {
        return content.split("\n")
    }
        
}

exports.StrHelper = StrHelper;