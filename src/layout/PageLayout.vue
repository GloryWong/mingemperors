<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ props.title }}</ion-title>
        <div slot="end" style="padding-right: 20px;">
          <slot name="extra" />
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-progress-bar type="indeterminate" slot="fixed" v-show="props.useProgressBar && props.progressBarVisible" color="primary" />
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ props.title }}</ion-title>
        </ion-toolbar>
      </ion-header> -->
    
      <slot />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { IonPage, IonItem, IonContent, IonHeader, IonToolbar, IonTitle, IonProgressBar } from '@ionic/vue';

const props = withDefaults(defineProps<{
    title: string,
    useProgressBar?: boolean,
    progressBarVisible?: boolean,
}>(), {
  useProgressBar: false,
  progressBarVisible: false,
});
</script>