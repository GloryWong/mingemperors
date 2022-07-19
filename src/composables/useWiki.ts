import { createSharedComposable } from "@vueuse/core";
import wikiData from "@/data/wiki.json";
import { computed, readonly, ref } from 'vue';

export const getWikiPrefxById = (id: string) => 
    wikiData.find(item => item.id === id);

export { wikiData };

export const useWiki = createSharedComposable(() => {
    const wikiId = ref(localStorage.getItem('mingemperors-wiki-id') ?? wikiData[0].id);
    const updateWikiId = (index: string) => {
        wikiId.value = index;
        localStorage.setItem('mingemperors-wiki-id', index);
    }

    const wikiUrlPrefix = computed(() => getWikiPrefxById(wikiId.value)?.urlPrefix);

    return {
        wikiId: readonly(wikiId),
        updateWikiId,
        wikiUrlPrefix
    }
});