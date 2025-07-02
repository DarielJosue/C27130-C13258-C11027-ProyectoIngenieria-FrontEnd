<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mis Postulaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="mis-postulaciones-bg">
      <div class="applications-list">
        <div v-for="application in applications" :key="application.application_id" class="application-card">
          <div class="application-card-header">
            <div>
              <div class="job-title-row">
                <ion-icon name="briefcase-outline" class="job-icon" />
                <span class="job-title">{{ application.job_post?.title ?? 'Sin título' }}</span>
              </div>
              <div class="empresa-label">
                {{ application.job_post?.company?.company_name ?? 'Empresa no disponible' }}
              </div>
            </div>
            <span class="estado-chip" :class="{
              'estado-aplicado': application.status === 'Aplicado',
              'estado-revisado': application.status === 'Revisado',
              'estado-aceptado': application.status === 'Aceptado',
              'estado-rechazado': application.status === 'Rechazado'
            }">
              {{ application.status }}
            </span>
          </div>
          <div class="job-info">
            <p>
              <span class="info-label">Descripción:</span>
              <span class="info-value">{{ application.job_post?.description }}</span>
            </p>
            <p>
              <span class="info-label">Requisitos:</span>
              <span class="info-value">{{ application.job_post?.requirements }}</span>
            </p>
            <p>
              <span class="info-label">Salario:</span>
              <span class="info-value">${{ application.job_post?.salary }}</span>
            </p>
            <p>
              <span class="info-label">Ubicación:</span>
              <span class="info-value">{{ application.job_post?.location }}</span>
            </p>
          </div>
          <div class="application-message-row">
            <ion-icon name="chatbubbles-outline" class="msg-icon" />
            <span class="info-label">Mensaje enviado: </span>
            <span class="application-message">{{ application.message }}
            </span>
          </div>
          <div class="application-card-footer">
            <span class="application-date">
              <ion-icon name="calendar-outline" />
              <span class="info-label">Fecha de aplicación: </span>
              {{ formatDate(application.application_date) }}
            </span>
            <ion-button size="small" fill="outline" class="cv-btn"
              @click="downloadCV(application.curriculum?.file_path)">
              <ion-icon name="download-outline" slot="start" />
              Ver CV
            </ion-button>
          </div>
        </div>
        <p v-if="applications.length === 0" class="empty-state">
          No has realizado postulaciones todavía.
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon
} from '@ionic/vue';

import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { getUserApplications } from '@/services/applicationService';
import { addIcons } from "ionicons";
import {
  briefcaseOutline,
  chatbubblesOutline,
  calendarOutline,
  downloadOutline
} from "ionicons/icons";
import { Browser } from '@capacitor/browser';
import { isPlatform } from '@ionic/vue';


addIcons({
  "briefcase-outline": briefcaseOutline,
  "chatbubbles-outline": chatbubblesOutline,
  "calendar-outline": calendarOutline,
  "download-outline": downloadOutline,
});
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
const CV_URL = "http://192.168.1.72:8000";

const downloadCV = async (filePath: string) => {
  if (!filePath) return alert('No hay currículum disponible');

  const cvUrl = `${CV_URL}/storage/${filePath}`;

  if (isPlatform('capacitor')) {
    try {
      await Browser.open({ url: cvUrl });
      return;
    } catch (error) {
      console.warn('Error abriendo el CV en Capacitor:', error);
    }
  }

  window.open(cvUrl, isPlatform('capacitor') ? '_system' : '_blank');
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}

.mis-postulaciones-bg {
  --background: #f5f8ff;
  padding-top: 20px;
  min-height: 100vh;
}

.applications-list {
  max-width: 480px;
  margin: 0 auto;
  padding-bottom: 28px;
}

.application-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(100, 141, 219, 0.09);
  margin-bottom: 22px;
  padding: 20px 18px 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.application-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 6px;
}

.job-title-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.job-icon {
  color: #648DDB;
  font-size: 1.25em;
}

.job-title {
  color: #429ef5;
  font-size: 1.1em;
  font-weight: 700;
  line-height: 1.1;
}

.empresa-label {
  color: #837C7C;
  font-size: 1em;
  font-weight: 500;
  margin-top: 2px;
  margin-left: 2px;
}

.estado-chip {
  display: inline-block;
  padding: 3px 14px;
  font-size: 0.87em;
  border-radius: 11px;
  font-weight: 700;
  min-width: 82px;
  text-align: center;
  margin-left: 9px;
  box-shadow: 0 1px 5px rgba(100, 141, 219, 0.06);
}

.estado-aplicado {
  background-color: rgba(100, 141, 219, 0.13);
  color: #648DDB;
}

.estado-revisado {
  background-color: rgba(255, 204, 0, 0.15);
  color: #cc9900;
}

.estado-aceptado {
  background-color: rgba(0, 200, 83, 0.12);
  color: #00c853;
}

.estado-rechazado {
  background-color: rgba(255, 82, 82, 0.11);
  color: #d32f2f;
}

.job-info {
  background: #f4f8fe;
  border-radius: 10px;
  padding: 11px 11px 7px 13px;
  margin: 7px 0 4px 0;
  font-size: 0.97em;
}

.info-label {
  font-weight: 600;
  color: #648DDB;
  margin-right: 2px;
}

.info-value {
  color: #333;
}

.application-message-row {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  color: #429ef5;
  font-size: 0.99em;
  margin: 3px 0 2px 0;
}

.msg-icon {
  font-size: 1.12em;
  color: #429ef5;
}

.application-message {
  color: #837C7C;
  font-size: 0.97em;
  font-weight: 500;
}

.application-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
}

.application-date {
  color: #648DDB;
  font-size: 0.93em;
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 500;
}

.cv-btn {
  --color: #429ef5;
  --border-radius: 10px;
  font-size: 0.97em;
  font-weight: 600;
  margin-left: 10px;
  border: 1px solid #429ef5;
  background: #fff;
}

.empty-state {
  color: #837C7C;
  text-align: center;
  margin-top: 38px;
  font-size: 1.02em;
  font-weight: 500;
}

@media (max-width: 600px) {
  .applications-list {
    max-width: 98vw;
    padding: 0 1vw 20px 1vw;
  }

  .application-card {
    padding: 13px 6px 10px 7px;
    margin-bottom: 16px;
  }

  .job-info {
    padding: 9px 5px 5px 8px;
  }
}

ion-header ion-toolbar[color="primary"] {
  --background: #648DDB !important;
  --ion-color-base: #648DDB !important;
}
</style>