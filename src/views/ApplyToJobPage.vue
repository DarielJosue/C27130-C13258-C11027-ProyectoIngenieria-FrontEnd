<template>
    <ion-page>
        <ion-header>
            <div class="ion-no-border">
                <ion-title>Aplicar al puesto</ion-title>
            </div>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="application-card">
                <ion-item class="custom-item">
                    <ion-label position="stacked">Mensaje para el empleador</ion-label>
                    <p>Puedes incluir un mensaje breve para el empleador.</p>

                    <ion-textarea v-model="message" placeholder="Escribe un mensaje breve..." class="custom-textarea" />
                </ion-item>

                <ion-item class="custom-item">
                    <ion-label position="stacked">Seleccionar currículum</ion-label>
                    <ion-select v-model="selectedCurriculumId" interface="popover">
                        <ion-select-option v-for="cv in curriculums" :key="cv.id" :value="cv.id">
                            {{ cv.name }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <div class="upload-section">
                    <label for="cv-upload" class="upload-label">
                        O subir uno nuevo (PDF)
                    </label>
                    <input id="cv-upload" type="file" accept="application/pdf" @change="handleFileUpload"
                        class="upload-input" />
                    <p v-if="selectedFile" class="upload-filename">
                        {{ selectedFile.name }}
                    </p>
                </div>

                <ion-button expand="block" class="submit-button" @click="submitApplication">
                    Enviar aplicación
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import {
    IonPage,
    IonHeader,
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
        goToHome();

    } catch (error: any) {
        console.error('Error al enviar aplicación:', error.response?.data?.message || error.message);
        // Extrae el mensaje real del error
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error desconocido al enviar la aplicación';

        alert(errorMessage);
        alert('Ocurrió un error al enviar la aplicación.');
    }
};
function goToHome() {
    //go to home

}
onMounted(async () => {
    curriculums.value = await getUserCurriculums();
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
    font-family: "Jaldi", sans-serif;
}

.ion-no-border {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 8px;
    gap: 10px;
    background-color: #648DDB;
    height: 56px;
    box-sizing: border-box;
}

.application-card {
    background: #ffffff;
    border: 1.5px solid #648ddb;
    border-radius: 18px;
    padding: 20px;
    max-width: 480px;
    margin: 24px auto;
    box-shadow: 0 2px 8px rgba(100, 141, 219, 0.1);
}

.custom-item {
    --border-radius: 12px;
    margin-bottom: 16px;
}

.custom-textarea {
    --background: #f8f9ff;
    --padding-start: 10px;
    --padding-end: 10px;
    --border-radius: 10px;
}

.upload-section {
    display: flex;
    flex-direction: column;
    margin: 12px 0 24px;
}

.upload-label {
    color: #333;
    font-weight: 500;
    margin-bottom: 6px;
}

.upload-input {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 10px;
    background-color: #f4f4f4;
}

.upload-filename {
    font-size: 0.9em;
    color: #648ddb;
    margin-top: 4px;
}

.submit-button {
    --background: #429ef5;
    --background-hover: #648ddb;
    --border-radius: 12px;
    font-weight: 500;
    letter-spacing: 0.03em;
}
</style>
