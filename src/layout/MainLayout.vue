<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <BottomMenu />
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import BottomMenu from '@/components/BottomMenu.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { BottomMenu, IonTabs, IonPage, IonRouterOutlet },
});
</script>
