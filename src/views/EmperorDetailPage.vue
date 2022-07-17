<template>
<page-layout :title="title" :useProgressBar="true" :progressBarVisible="showLoading">
  <iframe v-if="isNameValid" :src="`https://zh.wikipedia.org/wiki/${props.name}`" loading="lazy" ref="wikipeadiaIFrame"></iframe>
  <div class="hint" v-else>
    <ion-icon :icon="alertCircleOutline" size="large" />
    <ion-label class="ion-margin-start" color="medium">去<RouterLink :to="{ name: 'EmperorsPage'}">皇帝列表</RouterLink>选择一个浏览</ion-label>
  </div>
</page-layout>
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
import { IonIcon, IonLabel } from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { RouterLink } from 'vue-router';
import PageLayout from '@/layout/PageLayout.vue';
import emperors from '@/data/emperors.json';
import { useGlobalState } from '@/composables/useGlobalState';

const props = defineProps<{
  name: string
}>();

const wikipeadiaIFrame = ref<HTMLIFrameElement | null>(null);
const isWikipeadiaIFrameLoaded = ref(false);
const isNameEmpty = props.name === '';
const nameExists = emperors.find((emperor) => emperor[0] === props.name) !== undefined;
const isNameValid = !isNameEmpty && nameExists;
const showLoading = computed(() => isNameValid && !isWikipeadiaIFrameLoaded.value);
const title = (() => {
  const prefix = '皇帝百科 - ';
  if (isNameEmpty) {
    return `${prefix}名字不能为空`;
  } else if (!nameExists) {
    return `${prefix}${props.name}不存在`;
  } else {
    useGlobalState().updateViewingName(props.name);
    return `${prefix}${props.name}`;
  }
})();

onMounted(() => {
  if (wikipeadiaIFrame.value) {
    wikipeadiaIFrame.value.onload = () => {
      isWikipeadiaIFrameLoaded.value = true;
    };
  }
});
</script>
