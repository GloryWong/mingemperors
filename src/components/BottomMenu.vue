<template>
    <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Home" href="/home">
            <ion-icon :icon="diceOutline" />
            <ion-label>测验</ion-label>
        </ion-tab-button>
            
        <ion-tab-button tab="EmperorsPage" href="/emperors">
            <ion-icon :icon="listOutline" />
            <ion-label>皇帝列表</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="EmperorDetailPage" :href="`/emperor/${viewingName}`">
            <ion-icon :icon="newspaperOutline" />
            <ion-label>皇帝百科</ion-label>
        </ion-tab-button>
    </ion-tab-bar>
</template>

<script lang="ts" setup>
import { IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { diceOutline, listOutline, newspaperOutline } from 'ionicons/icons';
import { useGlobalState } from '@/composables/useGlobalState';

const { viewingName } = useGlobalState();
</script>