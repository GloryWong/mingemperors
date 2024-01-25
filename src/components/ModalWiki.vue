<template>
  <ion-modal :is-open="isOpen" @didPresent="onDidPresent" @didDismiss="onDidDismiss">
    <ion-header>
      <IonToolbar>
        <ion-select slot="start" interface="popover" v-model="wikiId" @ionChange="handleWikiUrlPrefixChange">
          <ion-select-option v-for="item in wikiSites" :key="item.id" :value="item.id">{{ item.name }}</ion-select-option>
        </ion-select>
        <IonTitle class="ion-text-center">{{ name }}</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="isOpen = false">关闭</IonButton>
        </IonButtons>
        <ion-progress-bar type="indeterminate" v-show="showLoading"></ion-progress-bar>
      </IonToolbar>
    </ion-header>
    <IonContent>
      <iframe :src="`${wikiUrlPrefix}${props.name}`" loading="lazy" ref="wikiIFrame"></iframe>
    </IonContent>
  </ion-modal>
</template>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, onMounted, ref, watch, onUnmounted } from 'vue';
import { IonIcon, IonLabel, IonProgressBar, IonModal, IonHeader, IonSelect, IonSelectOption, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonSpinner, IonLoading } from '@ionic/vue';
import { useWiki, wikiSites } from '@/composables/useWiki';

const props = defineProps<{
  name: string,
  modelValue: boolean
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', visible: boolean):void
}>();

const isOpen = ref(false);
watch(() => props.modelValue, (v) => isOpen.value = v, {immediate: true});
const onDidDismiss = () => {
  emit('update:modelValue', false);
}

const { wikiUrlPrefix, wikiId, updateWikiId } = useWiki();
const handleWikiUrlPrefixChange = (event: CustomEvent) => {
  const wikiId = event.detail.value;
  isWikiIFrameLoaded.value = false;
  updateWikiId(wikiId);
};

const wikiIFrame = ref<HTMLIFrameElement | null>(null);
const isWikiIFrameLoaded = ref(false);
const showLoading = computed(() => !isWikiIFrameLoaded.value);

const onDidPresent = () => isWikiIFrameLoaded.value = false;

watch(wikiIFrame, ($wikiIFrame) => {
  if ($wikiIFrame && !$wikiIFrame.onload) {
    $wikiIFrame.onload = () => {
      isWikiIFrameLoaded.value = true;
    };
  }
})
</script>
