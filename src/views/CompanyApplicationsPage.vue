<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Postulaciones Recibidas</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-select v-model="selectedJobPostId" placeholder="Filtrar por oferta">
                <ion-select-option v-for="post in jobPosts" :key="post.id" :value="post.id">
                    {{ post.title }}
                </ion-select-option>
            </ion-select>

            <ion-list>
                <ion-item v-for="application in filteredApplications" :key="application.id">
                    <ion-label>
                        <h2>{{ application.user.name }}</h2>
                        <p>{{ application.message }}</p>
                        <p>Estado: {{ application.status }}</p>
                        <p>Fecha: {{ formatDate(application.application_date) }}</p>
                        <ion-button size="small" @click="downloadCV(application.curriculum.file_path)">Ver
                            CV</ion-button>
                        <div>
                            <ion-select aria-placeholder="Cambiar estado" placeholder="Cambiar estado"
                                v-model="application.status" @ionChange="updateStatus(application)">
                                <ion-select-option value="Aplicado">Aplicado</ion-select-option>
                                <ion-select-option value="Revisado">Revisado</ion-select-option>
                                <ion-select-option value="Rechazado">Rechazado</ion-select-option>
                                <ion-select-option value="Aceptado">Aceptado</ion-select-option>
                            </ion-select>
                        </div>

                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton
} from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { getCompanyApplications, updateApplicationStatus } from '@/services/applicationService';
import { getCompanyJobPosts } from '@/services/jobPostService';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const companyId = authStore.companyId;
const applications = ref<any[]>([]);
const jobPosts = ref<any[]>([]);

const selectedJobPostId = ref<number | null>(null);

onMounted(async () => {
    try {
        if (!companyId) return alert('No se encontró el ID de la empresa');
        jobPosts.value = await getCompanyJobPosts(companyId);
        applications.value = await getCompanyApplications(companyId);
    } catch (error) {
        console.error('Error al cargar la vista:', error);
    }
});


const filteredApplications = computed(() => {
    if (!selectedJobPostId.value) return applications.value;
    return applications.value.filter(app => app.job_post.job_post_id === selectedJobPostId.value);
});

const updateStatus = async (application: any) => {
    try {
        console.log('Actualizando estado de la aplicación:', application);
        console.log('id de la aplicacion:', application.application_id);

        if (!application.application_id) {
            throw new Error('ID de la aplicación no encontrado');
        }
        await updateApplicationStatus(application.application_id, application.status);
        alert('Estado actualizado correctamente');
    } catch (err) {
        console.error(err);
        alert('Error al actualizar el estado');
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const downloadCV = (filePath: string) => {
    window.open(`/storage/${filePath}`, '_blank');
};
</script>
cam
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
    font-family: "Jaldi", sans-serif;
}
</style>