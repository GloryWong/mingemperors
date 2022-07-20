<template>
<async-page-layout :title="title" :useProgressBar="true" :progressBarVisible="showLoading">
  <template #extra>
    <ion-select interface="popover" v-model="wikiId" @ionChange="handleWikiUrlPrefixChange">
      <ion-select-option v-for="item in wikiData" :key="item.id" :value="item.id">{{ item.name }}</ion-select-option>
    </ion-select>
  </template>
  <iframe v-if="isNameValid" :src="`${wikiUrlPrefix}${props.name}`" loading="lazy" ref="wikiIFrame"></iframe>
  <div class="hint" v-else>
    <ion-icon :icon="alertCircleOutline" size="large" />
    <ion-label class="ion-margin-start" color="medium">去<RouterLink :to="{ name: 'EmperorsPage'}">皇帝列表</RouterLink>选择一个浏览</ion-label>
  </div>
</async-page-layout>
</template>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.hint {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import { IonIcon, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { RouterLink } from 'vue-router';
// import PageLayout from '@/layout/PageLayout.vue';
import emperors from '@/data/emperors.json';
import { useWiki, wikiData } from '@/composables/useWiki';
import AsyncPageLayout from '@/layout/AsyncPageLayout';

const props = defineProps<{
  name: string
}>();

const { wikiUrlPrefix, wikiId, updateWikiId } = useWiki();
const handleWikiUrlPrefixChange = (event: CustomEvent) => {
  const wikiId = event.detail.value;
  isWikiIFrameLoaded.value = false;
  updateWikiId(wikiId);
};

const wikiIFrame = ref<HTMLIFrameElement | null>(null);
const isWikiIFrameLoaded = ref(false);
const isNameEmpty = props.name === '';
const nameExists = emperors.find((emperor) => emperor[0] === props.name) !== undefined;
const isNameValid = !isNameEmpty && nameExists;
const showLoading = computed(() => isNameValid && !isWikiIFrameLoaded.value);
const title = (() => {
  const prefix = '皇帝百科 - ';
  if (isNameEmpty) {
    return `${prefix}名字不能为空`;
  } else if (!nameExists) {
    return `${prefix}${props.name}不存在`;
  } else {
    return `${prefix}${props.name}`;
  }
})();

onMounted(() => {
  if (wikiIFrame.value) {
    wikiIFrame.value.onload = () => {
      isWikiIFrameLoaded.value = true;
    };
  }
});
</script>
