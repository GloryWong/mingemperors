<template>
    <div id="emperorsTable">
        <ion-list lines="full" style="padding: 0;">
            <ion-list-header color="medium" class="ion-text-center">
                <ion-label v-for="item, index in header" :key="index" class="ion-text-center">{{ item }}</ion-label>
            </ion-list-header>
            <ion-item v-for="emperor, index in emperors" :key="index"
                class="ion-text-center"
                button
                fill="solid"
                @click="handleClickItem(emperor)">
                <ion-label v-for="item, index in emperor" :key="index">
                    {{ item }}
                </ion-label>
            </ion-item>
        </ion-list>
        <ModalWiki :name="emperorName" v-model="modalOpen"></ModalWiki>
    </div>
</template>

<script lang="ts" setup>
import { IonList, IonItem, IonLabel, IonListHeader } from '@ionic/vue';
import emperors from '@/data/emperors.json';
import ModalWiki from './ModalWiki.vue';
import { ref } from 'vue';

const header = [
    '姓名',
    '年号',
    '庙号',
];

const emperorName = ref('');
const modalOpen = ref(false);
const handleClickItem = (emperor: string[]) => {
    emperorName.value = emperor[0];
    modalOpen.value = true;
};
</script>