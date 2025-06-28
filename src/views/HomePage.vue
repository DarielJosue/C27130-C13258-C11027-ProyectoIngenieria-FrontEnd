<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="search-bar">
          <ion-icon :icon="arrowBackOutline" class="icon-btn" />
          <template v-if="authStore.userType !== 'company'">

            <ion-select interface="popover" placeholder="Menú" v-model="selectedOption" @ionChange="handleCompanyMenu">
              <ion-select-option value="my-applications">Ver Postulaciones</ion-select-option>
              <ion-select-option value="notifications">
                Notificaciones</ion-select-option>
            </ion-select>
          </template>

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
      <div v-if="showCompanyWarning" class="company-warning">
        <div class="company-warning-card">
          <div class="company-warning-header">
            <ion-icon name="alert-circle-outline" class="company-warning-icon"></ion-icon>
            <span class="company-warning-title">Complete su perfil de empresa</span>
          </div>
          <div class="company-warning-content">
            Aún no ha registrado la información de su empresa.<br>
            Hágalo ahora para publicar ofertas de trabajo.
          </div>
          <ion-button expand="block" class="company-warning-btn" @click="goToRegisterCompany">
            Registrar Empresa
          </ion-button>
        </div>
      </div>



      <!--  <ExploreContainer name="Tab 1 page" />-->
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
  IonButton,
} from '@ionic/vue';
import { arrowBackOutline, personOutline } from 'ionicons/icons';
//import ExploreContainer from '@/components/ExploreContainer.vue';
import { ref, watch } from 'vue';
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
  } else if (selectedOption.value === 'my-applications') {
    console.log('Redirigiendo a mis postulaciones');
    router.push('my-applications');
  }
};

const authStore = useAuthStore();
const showCompanyWarning = ref(false);
console.log('token:', authStore.token);


watch(
  () => authStore.userType,
  (newType) => {
    if (newType === 'company') {
      const companyId = authStore.getCompanyId();
      console.log('Watch detectó companyId:', companyId);
      if (!companyId && authStore.userType === 'company') {
        console.log('No hay empresa asociada, mostrando advertencia');
        showCompanyWarning.value = true;
      }
      else {
        console.log('Empresa asociada, ocultando advertencia');
        showCompanyWarning.value = false;
      }
    }
  },
  { immediate: true });

function goToRegisterCompany() {
  router.push('/company/register');
}

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

.company-warning {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.company-warning-card {
  background: #ffffff;
  border: 1.5px solid #648DDB;
  border-radius: 18px;
  padding: 20px 24px;
  min-width: 320px;
  max-width: 400px;
  box-shadow: 0 2px 8px 0 rgba(100, 141, 219, 0.05);
}

.company-warning-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.company-warning-icon {
  color: #429ef5;
  font-size: 1.8em;
  margin-right: 8px;
}

.company-warning-title {
  color: #648DDB;
  font-size: 1.1em;
  font-weight: 600;
}

.company-warning-content {
  color: #837C7C;
  font-size: 1em;
  margin-bottom: 18px;
  line-height: 1.5;
}

.company-warning-btn {
  --background: #429ef5;
  --background-hover: #648DDB;
  --color: #fff;
  --border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.03em;
  box-shadow: none;
}

ion-header ion-toolbar[color="primary"] {
  --background: #648DDB !important;
  --ion-color-base: #648DDB !important;
}
</style>
