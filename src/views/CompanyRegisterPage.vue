<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Registrar Empresa</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="register-company-bg">
            <div class="register-company-wrapper">
                <ion-list lines="none" class="register-company-form">
                    <ion-item class="register-company-item">
                        <ion-label position="stacked">Nombre de la Empresa</ion-label>
                        <ion-input v-model="form.company_name" placeholder="Ej: Tech S.A." />
                    </ion-item>
                    <ion-item class="register-company-item">
                        <ion-label position="stacked">Descripción</ion-label>
                        <ion-textarea v-model="form.description" :rows="3"
                            placeholder="Cuéntanos sobre tu empresa..." />
                    </ion-item>
                    <ion-item class="register-company-item">
                        <ion-label position="stacked">Teléfono</ion-label>
                        <ion-input v-model="form.phone" placeholder="Ej: 8888-9999" />
                    </ion-item>
                    <ion-item class="register-company-item">
                        <ion-label position="stacked">Ubicación</ion-label>
                        <ion-input v-model="form.location" placeholder="Provincia, Ciudad" />
                    </ion-item>
                    <ion-item class="register-company-item">
                        <ion-label position="stacked">Sitio web</ion-label>
                        <ion-input v-model="form.website" placeholder="https://miempresa.com" />
                    </ion-item>
                    <ion-item class="register-company-item">
                        <ion-label position="stacked">Tamaño</ion-label>
                        <ion-input v-model="form.company_size" placeholder="Ej: 1-10 empleados" />
                    </ion-item>
                    <ion-item class="register-company-item">
                        <ion-label position="stacked">Especialidades</ion-label>
                        <ion-textarea v-model="form.specialties" :rows="2" placeholder="Áreas de experiencia..." />
                    </ion-item>
                </ion-list>

                <ion-button expand="block" class="register-company-btn" @click="registerCompany">
                    Registrar
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup>
import { ref } from 'vue';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { createCompany } from '@/services/companyService';



const form = ref({
    company_name: '',
    description: '',
    phone: '',
    location: '',
    website: '',
    company_size: '',
    specialties: '',
});


const router = useRouter();

async function registerCompany() {

    try {

        const response = await createCompany({
            company_name: form.value.company_name,
            description: form.value.description,
            phone: form.value.phone,
            location: form.value.location,
            website: form.value.website,
            company_size: form.value.company_size,
            specialties: form.value.specialties,
        });

        console.log('creda con exito:', response.data);
        alert("Empresa registrada exitosamente");
        router.push('/tabs/home'); // Redirigir al dashboard de la empresa


    } catch (error) {
        if (error.response) {
            console.error('Backend error:', error.response.data);
            alert("Error: " + JSON.stringify(error.response.data));
        } else {
            console.error('Error registering company:', error);
        }
    }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
    font-family: "Jaldi", sans-serif;
}

.register-company-bg {
    --background: #f5f8ff;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
}

.register-company-wrapper {
    width: 100%;
    max-width: 420px;
    margin: 40px auto;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px 0 rgba(100, 141, 219, 0.09);
    padding: 32px 24px 22px 24px;
    max-height: 85vh;
    overflow-y: auto;
}

.register-company-form {
    background: transparent;
}

.register-company-item {
    --background: transparent;
    --min-height: 60px;
    margin-bottom: 12px;
}

ion-label {
    font-size: 1em;
    color: #648DDB;
    margin-bottom: 6px;
    font-weight: 500;
}

ion-input,
ion-textarea {
    --padding-start: 0;
    --padding-end: 0;
    --highlight-color-focused: #429ef5;
    font-size: 1em;
    color: #222;
    background: #f4f8fe;
    border-radius: 10px;
    padding: 8px 10px;
    margin-top: 2px;
}

ion-input::part(native),
ion-textarea::part(native) {
    background: transparent;
    color: #222;
}

.register-company-btn {
    --background: #429ef5;
    --background-hover: #648DDB;
    --color: #fff;
    --border-radius: 12px;
    font-weight: 600;
    margin-top: 16px;
    letter-spacing: 0.03em;
    box-shadow: none;
}

@media (max-width: 600px) {
    .register-company-wrapper {
        max-width: 98vw;
        padding: 20px 6px 16px 6px;
        margin: 12px auto;
    }
}

ion-header ion-toolbar[color="primary"] {
    --background: #648DDB !important;
    --ion-color-base: #648DDB !important;
}
</style>
