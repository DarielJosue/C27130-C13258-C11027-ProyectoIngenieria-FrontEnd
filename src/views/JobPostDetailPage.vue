<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/jobs"></ion-back-button>
        </ion-buttons>
        <ion-title>Detalles de la Oferta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="detail-container" v-if="post">
        <h1 class="job-title">{{ post.title }}</h1>
        <h2 class="company-name">{{ post.company_name || 'Empresa no disponible' }}</h2>

        <div class="detail-info">
          <ion-icon :icon="locationOutline" />
          <span>{{ post.location || 'Ubicación no disponible' }}</span>
        </div>

        <div class="detail-info">
          <ion-icon :icon="cashOutline" />
          <span>Salario: ${{ post.salary || 'No especificado' }}</span>
        </div>

        <div class="detail-info">
          <ion-icon :icon="calendarOutline" />
          <span>Publicado el: {{ formatDate(post.created_at) }}</span>
        </div>

        <div class="description-box">
          <h3>Descripción</h3>
          <p>{{ post.description }}</p>
        </div>

        <div class="detail-buttons">
          <router-link :to="`/jobs/${post.id}/apply`" style="text-decoration: none;">
            <ion-button slot="end" size="small" color="secondary">Aplicar</ion-button>
          </router-link>
          <ion-button expand="block" fill="outline" color="medium">Guardar</ion-button>
        </div>
      </div>
      <div v-else>
        <ion-spinner name="dots" />
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getJobPostById } from "@/services/jobPostService";
import { formatDate } from "@/utils/dateUtils";
import { locationOutline, cashOutline } from "ionicons/icons";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon

} from "@ionic/vue";
import { calendarOutline } from "ionicons/icons";
const route = useRoute();
const post = ref<any>(null);

onMounted(async () => {
  try {
    const response = await getJobPostById(Number(route.params.id));
    post.value = response.data;
  } catch (err) {
    console.error("Error al obtener detalles:", err);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: 'Jaldi', sans-serif;
}


.detail-container {
  background-color: var(--ion-background-color);
  color: var(--ion-text-color);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(99, 121, 180, 0.1);
}

.job-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #5f87e3;
  margin-bottom: 8px;
}

.company-name {
  font-size: 1.1rem;
  color: #648ddb;
  margin-bottom: 16px;
}

.detail-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #444;
  margin-bottom: 12px;
}

.description-box {
  background-color: var(--ion-background-color);
  color: var(--ion-text-color);
  padding: 12px;
  border-radius: 12px;
  margin-top: 20px;
  color: #333;
}

.description-box h3 {
  color: #429ef5;
  margin-bottom: 6px;
}

.detail-buttons {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

ion-button[color="secondary"] {
  --background: #429ef5;
  --color: white;
}

ion-button[color="medium"] {
  --border-color: #648ddb;
  --color: #648ddb;
}
</style>
