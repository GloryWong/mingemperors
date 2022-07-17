<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ props.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-progress-bar type="indeterminate" slot="fixed" v-show="props.useProgressBar && props.progressBarVisible" color="primary" />
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ props.title }}</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <slot />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonProgressBar } from '@ionic/vue';

const props = withDefaults(defineProps<{
    title: string,
    useProgressBar?: boolean,
    progressBarVisible?: boolean,
}>(), {
  useProgressBar: false,
  progressBarVisible: false,
});
</script>