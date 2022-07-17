<template>
    <div id="emperorsTable">
        <ion-list lines="full">
            <ion-list-header color="medium">
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
    </div>
</template>

<script lang="ts" setup>
import { IonList, IonItem, IonLabel, IonListHeader } from '@ionic/vue';
import { useRouter } from 'vue-router';
import emperors from '@/data/emperors.json';

const header = [
    '姓名',
    '年号',
    '庙号',
];

const router = useRouter();
const handleClickItem = (emperor: string[]) => {
    router.push({
        name: 'EmperorDetailPage',
        params: {
            name: emperor[0]
        }
    });
};

</script>