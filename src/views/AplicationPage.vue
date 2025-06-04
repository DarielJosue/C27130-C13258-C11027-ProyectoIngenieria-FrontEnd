<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mis Postulaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="application in applications" :key="application.id">
          <ion-label>
            <h2>{{ application.job_post.title }}</h2>
            <p>{{ application.message }}</p>

            <div class="estado-chip" :class="{
              'estado-aplicado': application.status === 'Aplicado',
              'estado-revisado': application.status === 'Revisado',
              'estado-aceptado': application.status === 'Aceptado',
              'estado-rechazado': application.status === 'Rechazado'
            }">
              <p>Estado: {{ application.status }}</p>
            </div>

            <p>Fecha: {{ formatDate(application.application_date) }}</p>
            <ion-button size="small" @click="downloadCV(application.curriculum.file_path)">
              Ver CV
            </ion-button>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton
} from '@ionic/vue';

import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { getUserApplications } from '@/services/applicationService';

const authStore = useAuthStore();
const userId = authStore.getUserId();
const applications = ref<any[]>([]);

onMounted(async () => {
  if (!userId) {
    alert("Usuario no autenticado");
    return;
  }

  try {
    applications.value = await getUserApplications();
  } catch (error) {
    console.error("Error al cargar las postulaciones:", error);
  }
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString();
};

const downloadCV = (filePath: string) => {
  window.open(`/storage/${filePath}`, '_blank');
};
</script>

<style scoped>
.estado-chip {
  display: inline-block;
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  margin-top: 6px;
}

.estado-aplicado {
  background-color: rgba(95, 135, 227, 0.2);
  color: var(--color-primary);
}

.estado-revisado {
  background-color: rgba(255, 204, 0, 0.2);
  color: #cc9900;
}

.estado-aceptado {
  background-color: rgba(0, 200, 83, 0.2);
  color: #00c853;
}

.estado-rechazado {
  background-color: rgba(255, 82, 82, 0.2);
  color: #d32f2f;
}
</style>