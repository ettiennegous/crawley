import { Injectable } from '@angular/core';

@Injectable()
export class StrHelperService {

  constructor() { }

  cleanLinks(baseURL: string, linksArray: string[]) {
    var filterFunc = (function (link) {
      link = link.toLowerCase()
      if (this.isEmptyLink(link)) return false
      if (!this.isValidLink(baseURL, link)) return false
      if (this.isTelephoneLink(link)) return false
      if (this.isExternalLink(baseURL, link)) return false
      return true
    }.bind(this))

    var mapFunc = (function (link) {
      return this.prefixDomain(baseURL, link);
    }.bind(this))

    return linksArray.filter(filterFunc).map(mapFunc);
  }

  prefixDomain(baseURL: string, link: string) {
    return (!link.startsWith("http")) ? baseURL + link : link
  }

  isExternalLink(baseURL: string, link: string) {
    return link.startsWith("http") && !link.startsWith(baseURL);
  }

  isValidLink(baseURL: string, link: string) {
    return link.startsWith("http") || this.isURL(baseURL + link)
  }

  isTelephoneLink(link: string) {
    return link.startsWith('tel:')
  }

  isEmptyLink(link: string) {
    return link.trim() == ''
  }

  getLinksFromContent(content: string) {
    var links = [];
    const patt = /<a href=(?:"|')(.*?)(?:"|')/g;
    var match;
    while (match = patt.exec(content)) {
      links.push(match[1])
    }
    return links
  }

  isURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
  }

  splitLines(content: string) {
    return content.split("\n")
  }


}
