<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="search-bar">
          <ion-icon :icon="arrowBackOutline" class="icon-btn" @click="goBack" />
          <ion-title class="title">Mi perfil</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="profile-container">
        <ion-avatar class="profile-avatar">
          <ion-icon :icon="personOutline" class="avatar-icon" />
        </ion-avatar>

        <h2 class="profile-name">{{ user.name }} {{ user.lastname }}</h2>
        <p class="profile-biography">{{ user.biography }}</p>

        <ion-list lines="none">
          <ion-item>
            <ion-icon :icon="callOutline" slot="start" />
            <ion-label>{{ user.phone_number }}</ion-label>
          </ion-item>

          <ion-item>
            <ion-icon :icon="locationOutline" slot="start" />
            <ion-label>{{ user.address }}</ion-label>
          </ion-item>

          <ion-item>
            <ion-icon :icon="heartOutline" slot="start" />
            <ion-label>Intereses (pronto)</ion-label>
          </ion-item>
        </ion-list>
      </div>
      <ion-item>
        <ion-button expand="block" @click="goToEditProfile" color="primary">Editar perfil</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { personOutline, arrowBackOutline, callOutline, locationOutline, heartOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};

const goToEditProfile = () => {
  router.push('/edit-profile');
};


// Simulación temporal de datos del usuario
const user = {
  name: 'David',
  lastname: 'Méndez',
  biography: 'Desarrollador de software apasionado por la tecnología y el aprendizaje continuo.',
  phone_number: '+506 8888-8888',
  address: 'San José, Costa Rica',
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 56px;
}

.icon-btn {
  font-size: 24px;
  margin-right: 1rem;
  cursor: pointer;
}

.title {
  font-size: 20px;
  font-weight: bold;
  font-family: 'Jaldi', sans-serif;
}

.profile-container {
  text-align: center;
  font-family: 'Jaldi', sans-serif;
}

.profile-avatar {
  margin: 1rem auto;
  background-color: #f1f1f1;
  width: 100px;
  height: 100px;
}

.avatar-icon {
  font-size: 64px;
  color: gray;
  margin-top: 18px;
}

.profile-name {
  font-size: 22px;
  margin-top: 0.5rem;
}

.profile-biography {
  font-size: 16px;
  margin: 0.5rem auto 1rem;
  color: #666;
  padding: 0 1rem;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent;
}
</style>