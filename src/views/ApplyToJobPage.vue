<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Aplicar al puesto</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-item>
                <ion-label>Mensaje</ion-label>
                <ion-textarea v-model="message" placeholder="Escribe un mensaje para el empleador..." />
            </ion-item>

            <ion-item>
                <ion-label>Currículum</ion-label>
                <ion-select v-model="selectedCurriculumId" interface="popover">
                    <ion-select-option v-for="cv in curriculums" :key="cv.id" :value="cv.id">
                        {{ cv.name }}
                    </ion-select-option>
                </ion-select>
            </ion-item>

            <ion-item>
                <ion-label>O subir uno nuevo (PDF)</ion-label>
                <input type="file" accept="application/pdf" @change="handleFileUpload" />
            </ion-item>

            <ion-button expand="block" color="primary" @click="submitApplication">
                Enviar aplicación
            </ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { applyToJob } from '@/services/applicationService';
import { uploadCurriculum, getUserCurriculums } from '@/services/curriculumService';

const route = useRoute();
const jobPostId = Number(route.params.id);
const message = ref('');
const selectedCurriculumId = ref<number | null>(null);
const curriculums = ref<Array<{ id: number; name: string }>>([]);
const selectedFile = ref<File | null>(null);


const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        selectedFile.value = file;
    }
};

const submitApplication = async () => {
    let curriculumIdToUse = selectedCurriculumId.value;
    if (selectedFile.value) {
        const confirmUpload = window.confirm(
            'Vas a subir un nuevo currículum. ¿Deseas continuar?'
        );
        if (!confirmUpload) return;

        try {
            const uploadedId = await uploadCurriculum(selectedFile.value);
            curriculumIdToUse = uploadedId;
            console.log('Currículum subido con ID:', curriculumIdToUse);
            alert('Currículum subido correctamente.');
        } catch (error) {
            console.error('Error al subir currículum:', error);

            alert('Hubo un problema al subir el currículum.');
            return;
        }
    }

    try {
        await applyToJob({
            jobPostId,
            curriculumId: curriculumIdToUse,
            message: message.value,
        });
        alert('Aplicación enviada correctamente');
    } catch (error) {
        console.error('Error al enviar aplicación:', error);
        alert('Ocurrió un error al enviar la aplicación.');
    }
};

onMounted(async () => {
    curriculums.value = await getUserCurriculums();
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
  font-family: "Jaldi", sans-serif;
}
</style>
