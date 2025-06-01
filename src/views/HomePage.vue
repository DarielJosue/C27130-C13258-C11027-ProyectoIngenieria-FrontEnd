<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="search-bar">
          <ion-icon :icon="arrowBackOutline" class="icon-btn" />


          <template v-if="authStore.userType === 'company'">
            <ion-select interface="popover" placeholder="Menú Empresa" v-model="selectedOption"
              @ionChange="handleCompanyMenu">
              <ion-select-option value="applications">Administrar Postulaciones</ion-select-option>
              <ion-select-option value="posts">Administrar Publicaciones</ion-select-option>
            </ion-select>

          </template>

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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import {
  IonSelect,
  IonSelectOption,

} from "@ionic/vue";
import { useAuthStore } from '@/stores/authStore';

const selectedOption = ref('');

const handleCompanyMenu = () => {
  if (selectedOption.value === 'applications') {
    router.push('/company/applications');
  } else if (selectedOption.value === 'posts') {
    router.push('/company/posts');
  }
};

const authStore = useAuthStore();


</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8px;
  gap: 10px;
  background-color: #648DDB;
  height: 56px;
  box-sizing: border-box;
}

.icon-btn {
  font-size: 24px;
  cursor: pointer;
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
  margin-left: auto;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
