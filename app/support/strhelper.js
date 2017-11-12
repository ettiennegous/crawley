class StrHelper {

    cleanLinks(baseURL, linksArray) {
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

    prefixDomain(baseURL, link) {
        return (!link.startsWith("http")) ? baseURL + link : link
    }

    isExternalLink(baseURL, link) {
        return link.startsWith("http") && !link.startsWith(baseURL);
    }

    isValidLink(baseURL, link) {
        return link.startsWith("http") || this.isURL(baseURL + link)
    }

    isTelephoneLink(link) {
        return link.startsWith('tel:')
    }

    isEmptyLink(link) {
        return link.trim() == ''
    }

    isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }

    splitLines(content) {
        return content.split("\n")
    }
        
}

exports.StrHelper = StrHelper;