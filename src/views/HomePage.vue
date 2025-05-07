<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Buscador con botón atrás y perfil -->
        <div class="search-bar">
          <ion-icon :icon="arrowBackOutline" class="icon-btn" />
          <ion-searchbar class="search-input" placeholder="Buscar..." />
          <router-link to="/profile">
            <ion-avatar class="avatar-btn">
              <ion-icon :icon="personOutline" />
           </ion-avatar>
        </router-link>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonSearchbar,
  IonAvatar,
} from '@ionic/vue';
import { arrowBackOutline, personOutline } from 'ionicons/icons';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8px;
  gap: 8px;
  background-color: #648DDB;
  height: 56px; 
  box-sizing: border-box;
}

.icon-btn {
  font-size: 24px;
  color: black;
}

.search-input {
  flex: 1;
  --background: white;
  --border-radius: 10px;
  --box-shadow: none;
  --placeholder-color: #888;
  margin: 0;
}

.avatar-btn {
  background-color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
