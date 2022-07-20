import { defineAsyncComponent } from "vue";

const AsyncPageLayout = defineAsyncComponent(() => import("@/layout/PageLayout.vue"));

export default AsyncPageLayout;