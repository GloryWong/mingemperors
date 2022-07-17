<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="warning">
        <ion-icon :icon="alertCircleOutline" size="large" />
        <ion-label class="ion-margin-start">页面不从在<RouterLink :to="{name: 'Home'}">Return Home</RouterLink></ion-label>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.warning {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<script lang="ts" setup>
import { IonPage, IonContent, IonLabel, IonIcon } from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { RouterLink } from 'vue-router';
</script>