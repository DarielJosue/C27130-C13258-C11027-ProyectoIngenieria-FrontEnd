<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Crear Publicación</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Mensajes de estado -->
      <ion-alert v-if="error" :message="error" color="danger"></ion-alert>
      <ion-alert v-if="success" message="Publicación creada!" color="success"></ion-alert>
      <div v-if="authStore.isCompanyUser">
        <p>
          Completa el formulario para crear una nueva publicación de trabajo.
        </p>
        <form @submit.prevent="handleSubmit">
          <!-- Campos del formulario usando componentes Ionic -->
          <ion-item>
            <ion-label position="stacked">Título del puesto</ion-label>
            <ion-input v-model="formData.title" required type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Descripción</ion-label>
            <ion-textarea v-model="formData.description" required :rows="5"></ion-textarea>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Requisitos</ion-label>
            <ion-textarea v-model="formData.requirements" required :rows="5"
              placeholder="Ejemplo: Experiencia en JavaScript, Conocimientos de Vue.js"></ion-textarea>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Salario (USD)</ion-label>
            <ion-input v-model="formData.salary" required type="number" step="0.01"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Ubicación</ion-label>
            <ion-input v-model="formData.location" required type="text"></ion-input>
          </ion-item>

          <ion-button type="submit" expand="block" :disabled="loading">
            <ion-spinner v-if="loading"></ion-spinner>
            {{ loading ? "Creando..." : "Publicar" }}
          </ion-button>
        </form>
      </div>
      <div v-else class="access-denied">
        <h2>🔒 Acceso restringido a empresas</h2>
        <p>Debes ser usuario registrado como empresa para publicar un empleo.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { createJobPost } from "@/services/jobPostService";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonSpinner,
  IonAlert,
} from "@ionic/vue";

interface FormData {
  title: string;
  description: string;
  requirements: string;
  salary: string;
  location: string;
}

const authStore = useAuthStore();
const loading = ref(false);
const error = ref("");
const success = ref(false);

// Inicializar con fecha actual
const formData = reactive<FormData>({
  title: "",
  description: "",
  requirements: "",
  salary: "",
  location: "",
});
console.log("Token:", authStore.token);
console.log("Company ID:", authStore.companyId);
const handleSubmit = async () => {
  console.log("handleSubmit ejecutando");
  try {
    error.value = "";
    success.value = false;
    loading.value = true;

    if (!authStore.companyId) {
      throw new Error("Debes tener una compañía registrada");
    }


    const payload = {
      ...formData,
      company_id: authStore.companyId,
      salary: parseFloat(formData.salary),
    };
    console.log("Payload:", payload);
    await createJobPost(payload);

    success.value = true;
    // Resetear formulario
    Object.assign(formData, {
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
    });
    alert('¡publicado exitosamente!');
  } catch (err: any) {
    console.error(err);
    error.value = err.message || "Error al crear la publicación";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}

.restricted-message {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.restricted-message ion-icon {
  color: var(--ion-color-danger);
  margin-bottom: 1rem;
}
</style>
