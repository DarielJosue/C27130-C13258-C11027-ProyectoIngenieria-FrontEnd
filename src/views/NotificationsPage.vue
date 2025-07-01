<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="notif-title-header">Notificaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="(notif, index) in notificaciones" :key="index" lines="none" class="notification-item">
          <ion-label>
            <div class="notif-header">
              <h2 class="notif-title">{{ notif.title }}</h2>
              <span class="notif-time">{{ tiemposSimulados[index % tiemposSimulados.length] }}</span>
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

// Tiempos simulados solo para mostrar en el diseño
const tiemposSimulados = ["4m", "15m", "30m", "1h", "2h"];

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

/* Header estilo LinkedIn */
.notif-title-header {
  font-weight: 700;
  color: #ffffff;
  /* Forzar blanco en header */
}

/* Ítem de notificación */
.notification-item {
  align-items: flex-start;
  --padding-start: 12px;
  --inner-padding-end: 12px;
  padding: 12px;
  background-color: var(--ion-background-color);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background-color: rgba(100, 141, 219, 0.08);
}

ion-avatar img {
  border-radius: 50%;
  width: 44px;
  height: 44px;
  border: 2px solid var(--color-primary);
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notif-title {
  font-weight: 600;
  font-size: 15px;
  color: var(--ion-text-color);
  margin: 0;
}

.notif-time {
  font-size: 12px;
  color: var(--color-secondary);
  margin-left: 8px;
}

.notif-body {
  font-size: 14px;
  color: var(--ion-text-color);
  margin-top: 4px;
  line-height: 1.4;
}
</style>