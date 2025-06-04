<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Crear Publicación</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="job-post-bg">
      <div class="job-post-card">
        <div v-if="authStore.isCompanyUser">
          <h2 class="job-post-title">Nueva Oferta de Trabajo</h2>
          <p class="job-post-subtitle">
            Completa el formulario para publicar tu vacante.
          </p>
          <div v-if="error" class="job-post-alert job-post-alert-error">
            {{ error }}
          </div>
          <div v-if="success" class="job-post-alert job-post-alert-success">
            ¡Publicación creada exitosamente!
          </div>

          <form @submit.prevent="handleSubmit">
            <ion-list lines="none">
              <ion-item class="job-post-item">
                <ion-label position="stacked">Título del puesto</ion-label>
                <ion-input v-model="formData.title" required type="text" placeholder="Ej: Desarrollador Frontend" />
              </ion-item>

              <ion-item class="job-post-item">
                <ion-label position="stacked">Descripción</ion-label>
                <ion-textarea v-model="formData.description" required :rows="3"
                  placeholder="Describe el puesto y sus responsabilidades"></ion-textarea>
              </ion-item>

              <ion-item class="job-post-item">
                <ion-label position="stacked">Requisitos</ion-label>
                <ion-textarea v-model="formData.requirements" required :rows="2"
                  placeholder="Ej: Experiencia en Vue, manejo de REST APIs"></ion-textarea>
              </ion-item>

              <ion-item class="job-post-item">
                <ion-label position="stacked">Salario (USD)</ion-label>
                <ion-input v-model="formData.salary" required type="number" step="0.01"
                  placeholder="Ej: 1200"></ion-input>
              </ion-item>

              <ion-item class="job-post-item">
                <ion-label position="stacked">Ubicación</ion-label>
                <ion-input v-model="formData.location" required type="text"
                  placeholder="Ej: San José, Remoto"></ion-input>
              </ion-item>
            </ion-list>

            <ion-button type="submit" expand="block" class="job-post-btn" :disabled="loading">
              <ion-spinner v-if="loading" name="dots" style="margin-right:8px;"></ion-spinner>
              {{ loading ? "Creando..." : "Publicar" }}
            </ion-button>
          </form>
        </div>
        <div v-else class="access-denied">
          <ion-icon name="lock-closed-outline" class="access-denied-icon"></ion-icon>
          <h2>Acceso solo para empresas</h2>
          <p>
            Debes estar registrado como empresa para publicar un empleo.
          </p>
        </div>
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


.job-post-bg {
  --background: #f5f8ff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.job-post-card {
  width: 100%;
  max-width: 420px;
  margin: 38px auto 0 auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 22px 0 rgba(100, 141, 219, 0.10);
  padding: 28px 22px 20px 22px;
}

.job-post-title {
  color: #648DDB;
  font-size: 1.25em;
  font-weight: 700;
  margin: 0 0 4px 0;
  letter-spacing: 0.01em;
}

.job-post-subtitle {
  color: #837C7C;
  font-size: 1em;
  margin-bottom: 18px;
}

.job-post-item {
  --background: transparent;
  --min-height: 60px;
  margin-bottom: 12px;
}

ion-label {
  font-size: 1em;
  color: #648DDB;
  font-weight: 500;
}

ion-input,
ion-textarea {
  --padding-start: 0;
  --padding-end: 0;
  font-size: 1em;
  color: #222;
  background: #f4f8fe;
  border-radius: 9px;
  padding: 7px 10px;
  margin-top: 2px;
}

ion-input::part(native),
ion-textarea::part(native) {
  background: transparent;
  color: #222;
}

.job-post-btn {
  --background: #429ef5;
  --background-hover: #648DDB;
  --color: #fff;
  --border-radius: 12px;
  font-weight: 600;
  margin-top: 18px;
  letter-spacing: 0.03em;
  box-shadow: none;
  transition: opacity .2s;
}

.job-post-btn[disabled] {
  opacity: 0.8;
}

.job-post-alert {
  padding: 10px 12px;
  border-radius: 9px;
  margin-bottom: 14px;
  text-align: center;
  font-weight: 500;
  font-size: 0.97em;
  letter-spacing: .01em;
}

.job-post-alert-error {
  background: #ffeaea;
  color: #c32b2b;
  border: 1px solid #e09c9c;
}

.job-post-alert-success {
  background: #e7f7e6;
  color: #378c42;
  border: 1px solid #a6d3a0;
}

.access-denied {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #837C7C;
  text-align: center;
  padding: 30px 10px 10px 10px;
}

.access-denied-icon {
  font-size: 3em;
  color: #648DDB;
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .job-post-card {
    max-width: 98vw;
    padding: 16px 6px 14px 6px;
    margin: 12px auto 0 auto;
  }
}
</style>
