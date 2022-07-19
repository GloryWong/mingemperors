<template>
    <div id="container">
        <ion-card class="card" :style="{
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/A_Seated_Portrait_of_Ming_Emperor_Taizu.jpg/1024px-A_Seated_Portrait_of_Ming_Emperor_Taizu.jpg)`,
            pointerEvents: finishedOneRound ? 'none' : 'auto'
            }">
            <ion-card-header>
                <ion-card-title>
                    <h1>{{ title }}</h1>
                </ion-card-title>
                <ion-card-subtitle color="primary">
                    <h2>的{{ subtitle }}是？</h2>
                </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-list class="list">
                    <ion-radio-group @ionChange="handleChoiceChange" allowEmptySelection v-model="value">
                        <ion-item v-for="choice, index in choices" :key="index">
                            <ion-label :color="`${correctChoice === choice ? 'success' : wrongChoice === choice ? 'danger' : ''}`">{{ choice }}</ion-label>
                            <ion-radio slot="start" :value="choice" :color="`${correctChoice === choice ? 'success' : wrongChoice === choice ? 'danger' : ''}`" />
                        </ion-item>
                    </ion-radio-group>
                </ion-list>
            </ion-card-content>
        </ion-card>
        <div class="note" v-show="!finishedOneRound">
            <ion-item lines="none">
                <ion-label class="ion-text-wrap" color="medium">大明王朝生前在位统治全国的皇帝共16位...不乏趣闻：朱棣夺位；建文失踪；英宗复辟；正德豹房；嘉靖炼丹；穆宗贪色；万历怠政；光宗红丸；熹宗雕木...</ion-label>
            </ion-item>
            <ion-item lines="none">
                <ion-label class="ion-text-wrap" color="medium">你知道他们各自对应的名字、年号、庙号吗？</ion-label>
            </ion-item>
        </div>
        <div class="result" v-show="finishedOneRound">
            <ion-item lines="full">
                <ion-icon size="large" :icon="correct ? happyOutline : skullOutline" :color="correct ? 'success' : 'danger'" />
                <ion-label class="ion-margin-start" :color="correct ? 'success' : 'danger'"><h1>{{correct ? '正确': '错误'}}</h1></ion-label>
                <ion-label><h6>{{title}}的{{ subtitle }}是{{answer}}</h6></ion-label>
            </ion-item>
            <ion-item lines="full">
                <ion-buttons>
                    <ion-button color="primary" @click="newExam">
                        <ion-icon :icon="refreshOutline" />
                        下一题
                    </ion-button>
                    <ion-button color="medium" @click="toWikipedia">
                        <ion-icon :icon="arrowForwardOutline" />
                    去了解{{title}}</ion-button>
                </ion-buttons>
            </ion-item>
        </div>
    </div>
</template>

<style scoped>
.card {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.list {
    background-color: rgba(255, 255, 255, 0.8);
}
@media (prefers-color-scheme: dark) {
    .list {
        background-color: rgba(0, 0, 0, 0.5);
    }
}


:deep([role="listitem"]) {
    --background: transparent;
}
</style>

<script setup lang="ts">
import { IonButtons, IonIcon, IonCard, IonNote, IonButton, IonCardHeader, IonLabel, IonRadio, IonRadioGroup, IonList, IonItem, IonListHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { useExamGenerator, Question, Choices } from '@/composables/useExamGenerator';
import { computed, ref, watch } from 'vue';
import { happyOutline, skullOutline, refreshOutline, arrowForwardOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const value = ref('');

const generate = useExamGenerator();
const question = ref<Question>();
const choices = ref<Choices>([]);

const title = computed(() => question.value?.title || '');
const subtitle = computed(() => question.value?.subtitle || '');
const answer = computed(() => question.value?.answer || '');
const emperorName = computed(() => question.value?.emperorName || '');

const correctChoice = ref('');
const wrongChoice = ref('');
const correct = ref(false);
const finishedOneRound = ref(false);
const resetStatus = () => {
    correctChoice.value = '';
    wrongChoice.value = '';
    correct.value = false;
    finishedOneRound.value = false;
    value.value = '';
};

const handleChoiceChange = (event: CustomEvent) => {
    const choice = event.detail.value;
    if (choice === '') return;
    if (choice === answer.value) {
        correctChoice.value = choice;
        correct.value = true;
    } else {
        wrongChoice.value = choice;
        correctChoice.value = answer.value;
        correct.value = false;
    }
    finishedOneRound.value = true;
};

const newExam = () => {
    resetStatus();
    const exam = generate();
    question.value = exam.question;
    choices.value = exam.choices;
};

const router = useRouter();
const toWikipedia = () => {
    router.push({ name: 'EmperorDetailPage', params: { name: emperorName.value } });
};

newExam();
</script>
