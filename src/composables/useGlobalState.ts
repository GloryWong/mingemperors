import { createGlobalState } from "@vueuse/core";
import { readonly, ref } from "vue";


export const useGlobalState = createGlobalState(() => {
    const viewingName = ref(localStorage.getItem("mingemperors-viewing-name") || "");
    const updateViewingName = (name: string) => {
        const encodedName = encodeURIComponent(name);
        viewingName.value = encodedName;
        localStorage.setItem("mingemperors-viewing-name", encodedName);
    };

    return {
        viewingName: readonly(viewingName),
        updateViewingName
    };
});