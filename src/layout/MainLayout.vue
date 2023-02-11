<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet />

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="Exam" href="/exam">
              <ion-icon :icon="diceOutline" />
              <ion-label>测验</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="EmperorsPage" href="/emperors">
              <ion-icon :icon="listOutline" />
              <ion-label>皇帝列表</ion-label>
          </ion-tab-button>
      </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonTabs, IonPage, IonContent, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { diceOutline, listOutline } from 'ionicons/icons';
</script>
