const wikipediaUrlPrefix = 'https://zh.wikipedia.org/wiki/';
const baidubaikeUrlPrefix = 'https://baike.baidu.com/item/';

export type WikiSite = 'wikipedia' | 'baidubaike'
export const getWikiUrlPrefix = (wikiSite: WikiSite) => {
    switch (wikiSite) {
        case 'wikipedia':
        return wikipediaUrlPrefix;
        case 'baidubaike':
        return baidubaikeUrlPrefix;
        default:
        return wikipediaUrlPrefix;
    }
}
