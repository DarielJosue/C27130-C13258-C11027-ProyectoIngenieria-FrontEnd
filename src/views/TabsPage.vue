<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home" style="  color: #837C7C;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="custom-tab">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
          </svg>
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="jobs" href="/tabs/jobs" style="  color: #837C7C;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="custom-tab">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
            <path d="M12 12l0 .01" />
            <path d="M3 13a20 20 0 0 0 18 0" />
          </svg>
          <ion-label>Trabajos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="posts" href="/tabs/posts" style="  color: #837C7C;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="custom-tab">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <path d="M12 11l0 6" />
            <path d="M9 14l6 0" />
          </svg>
          <ion-label>Publicar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="notifications" href="/tabs/notifications" style="  color: #837C7C;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="custom-tab">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          </svg>
          <ion-label>Notificaciones</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="messages" href="/tabs/messages" style="  color: #837C7C;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="custom-tab">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 9h8" />
            <path d="M8 13h6" />
            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
          </svg>
          <ion-label>Mensajes</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, /*IonIcon,*/ IonPage, IonRouterOutlet } from '@ionic/vue';
//import { ellipse, square, triangle } from 'ionicons/icons';
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jaldi&display=swap');

.custom-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #837C7C;
  white-space: nowrap;
}

.ion-tab-bar {
  background-color: #dddddd;
}

* {
  font-family: 'Jaldi', sans-serif;
}

.custom-tab ion-label {
  font-size: 8px;
  line-height: 10px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-tab svg {
  margin-bottom: 4px;
  width: 22px;
  height: 22px;
}

ion-tab-button {
  display: flex;
  flex-direction: column;
  background-color: #dddddd;
  align-items: center;
  justify-content: center;
  height: 60px;
}

ion-tab-button svg {
  margin-bottom: 4px;
  width: 22px;
  height: 22px;
}

ion-tab-button ion-label {
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


@media (min-width: 480px) {

  .custom-tab ion-label,
  ion-tab-button ion-label {
    font-size: 10px;
    line-height: 12px;
  }

  .custom-tab svg,
  ion-tab-button svg {
    width: 26px;
    height: 26px;
  }

  ion-tab-button {
    height: 70px;
  }
}


@media (min-width: 768px) {

  .custom-tab ion-label,
  ion-tab-button ion-label {
    font-size: 12px;
    line-height: 14px;
  }

  .custom-tab svg,
  ion-tab-button svg {
    width: 30px;
    height: 30px;
  }

  ion-tab-button {
    height: 80px;
  }
}
</style>
