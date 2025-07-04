<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Buscador con botón atrás y perfil -->
        <div class="search-bar">
          <ion-searchbar class="search-input" placeholder="Buscar..." @ionInput="handleSearch" :debounce="300" />
          <router-link to="/profile">
            <ion-avatar class="avatar-btn">
              <ion-icon :icon="personOutline" />
            </ion-avatar>
          </router-link>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="isLoading" class="loading-spinner">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
      <ion-refresher slot="fixed" @ionRefresh="loadPosts">
        <ion-refresher-content pulling-icon="chevron-down-circle-outline"
          refreshing-spinner="bubbles"></ion-refresher-content>
      </ion-refresher>

      <ion-list v-if="!isLoading && jobPosts.length > 0">
        <ion-card class="job-card" v-for="post in jobPosts" :key="post.job_post_id">
          <ion-card-header>
            <ion-card-title class="title">{{ post.title }}</ion-card-title>
            <ion-card-subtitle class="subtitle">{{ post.company_name }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <div class="info-row">
              <ion-icon :icon="locationOutline"></ion-icon>
              <span>{{ post.location || 'Ubicación no disponible' }}</span>
            </div>
            <div class="info-row">
              <ion-icon :icon="cashOutline"></ion-icon>
              <span>${{ post.salary || 'No especificado' }}</span>
            </div>
            <div class="info-row">
              <ion-icon :icon="documentTextOutline"></ion-icon>
              <span class="truncate">{{ post.description }}</span>
            </div>

            <div class="action-buttons">
              <ion-button size="small" @click="goToDetail(post.job_post_id)" color="primary">Ver</ion-button>
              <router-link :to="`/jobs/${post.job_post_id}/apply`" style="text-decoration: none;">
                <ion-button slot="end" size="small" color="secondary">Aplicar</ion-button>
              </router-link>
              <ion-button size="small" fill="outline" color="medium" @click="save(post.job_post_id)">Guardar</ion-button>
            </div>
          </ion-card-content>
        </ion-card>

      </ion-list>

      <div v-if="!isLoading && jobPosts.length === 0" class="no-posts">
        <p>No hay publicaciones disponibles.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { addIcons } from "ionicons";
import { useRouter } from "vue-router";
import { chevronDownCircleOutline, cashOutline, locationOutline, documentTextOutline } from "ionicons/icons";
import { ref, onMounted } from "vue";
import { getAllJobPosts } from "@/services/jobPostService";
import { personOutline } from 'ionicons/icons';
import {
  IonPage,
  IonIcon,
  IonSearchbar,
  IonAvatar,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
} from "@ionic/vue";

import { saveJobPost } from "@/services/jobPostService";

addIcons({
  "chevron-down-circle-outline": chevronDownCircleOutline,
});
interface JobPost {
  job_post_id: number;
  title: string;
  description: string;
  requirements: string;
  salary: number;
  location: string;
  company_name?: string;
}
const searchTerm = ref('');
const jobPosts = ref<JobPost[]>([]);
const isLoading = ref(false);

// Manejador de búsqueda
const handleSearch = (event: CustomEvent) => {
  searchTerm.value = event.detail.value || '';
  loadPosts();
};


const router = useRouter();

const goToDetail = (job_post_id: number) => {
  console.log("Navigating to job post detail:", job_post_id);
  if (!job_post_id) {  
  console.error("ID is undefined or null");
    return;
  }
  router.push(`/job-posts/${job_post_id}`);
};

const save = async (job_post_id: number) => {
  try {
    await saveJobPost(job_post_id);
    alert("Oferta guardada correctamente.");
  } catch (err) {
    console.error("Error al guardar:", err);
    alert("Error al guardar.");
  }
};

const loadPosts = async (event?: CustomEvent) => {
  isLoading.value = true;

  try {
    const response = await getAllJobPosts(searchTerm.value);
    jobPosts.value = response.data || [];
  } catch (err) {
    console.error("Error al cargar publicaciones", err);
  } finally {
    isLoading.value = false; 
    if (event) {
      (event.target as HTMLIonRefresherElement).complete();
    }
  }
};

onMounted(loadPosts);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

ion-spinner {
  transform: scale(1.5);
  --color: var(--ion-color-primary);
}

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

.job-card {
  border-radius: 16px;
  background-color: var(--ion-background-color);
  /* Color de fondo del tema cambiar en las demas paginas*/
  color: var(--ion-text-color);
  box-shadow: 0 2px 8px rgba(99, 121, 180, 0.15);
  margin-bottom: 16px;
}

.title {
  font-size: 1.2rem;
  color: #5f87e3;
  font-weight: 600;
}

.subtitle {
  font-size: 0.95rem;
  color: #648ddb;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 8px;
}

.info-row ion-icon {
  margin-right: 8px;
  color: #5f87e3;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: space-between;
}

ion-button[color="primary"] {
  --background: #5f87e3;
  --color: white;
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