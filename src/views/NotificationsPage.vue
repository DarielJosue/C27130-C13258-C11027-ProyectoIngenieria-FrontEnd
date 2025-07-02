<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="notif-title-header">Notificaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="(notif, index) in notificaciones" :key="index" lines="none" class="notification-item">
          <ion-label>
            <div class="notif-header">
              <h2 class="notif-title">{{ notif.title }}</h2>
            </div>
            <p class="notif-body" v-html="notif.body"></p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { onMounted } from "vue";
import { useNotificationService } from "@/services/NotificationService";
import { Capacitor } from "@capacitor/core";
const { initPush, getNotifications, loadStoredNotifications } = useNotificationService();
const notificaciones = getNotifications();

onMounted(async () => {
  if (Capacitor.getPlatform() === "android") {
    await initPush();
    await loadStoredNotifications();
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}

ion-toolbar {
  --background: #648DDB !important;
  --color: #ffffff;
}

.notification-item {
  padding: 12px 0;
  border-bottom: 1px solid #e1e1e1;
}

.notif-title {
  font-size: 16px;
  font-weight: 600;
  color: #212121;
}

.notif-time {
  font-size: 13px;
  color: #999;
  float: right;
}

.notif-body {
  font-size: 15px;
  margin-top: 4px;
  color: #444;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>