<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notificaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="(notif, index) in notificaciones" :key="index">
          <ion-label>
            <h2>{{ notif.title }}</h2>
            <p>{{ notif.body }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { onMounted } from 'vue';
import { useNotificationService } from '@/services/NotificationService';

const { initPush, getNotifications, loadStoredNotifications } = useNotificationService();
const notificaciones = getNotifications();

onMounted(async () => {
  await initPush();
  await loadStoredNotifications();
});
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}
</style>