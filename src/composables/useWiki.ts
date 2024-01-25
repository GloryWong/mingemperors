import { createSharedComposable } from "@vueuse/core";
import wikiSites from "@/data/wiki-sites.json";
import { computed, readonly, ref } from 'vue';

export const getWikiPrefxById = (id: string) => 
    wikiSites.find(item => item.id === id);

export { wikiSites };

const STORAGE_SITE_KEY = 'mingemperors-wiki-site-id';

export const useWiki = createSharedComposable(() => {
    const wikiId = ref(localStorage.getItem(STORAGE_SITE_KEY) ?? wikiSites[0].id);
    const updateWikiId = (id: string) => {
        wikiId.value = id;
        localStorage.setItem(STORAGE_SITE_KEY, id);
    }

    const wikiUrlPrefix = computed(() => getWikiPrefxById(wikiId.value)?.urlPrefix);

    return {
        wikiId: readonly(wikiId),
        updateWikiId,
        wikiUrlPrefix
    }
});