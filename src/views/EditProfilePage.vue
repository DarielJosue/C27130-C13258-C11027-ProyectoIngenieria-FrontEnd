<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/profile" />
                </ion-buttons>
                <ion-title>Editar Perfil</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label position="stacked">Biografía</ion-label>
                    <ion-textarea v-model="form.biography" :rows="7" placeholder="¡Hablanos un poco sobre ti!">
                    </ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Teléfono</ion-label>
                    <ion-input v-model="form.phone_number" type="tel" />
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Dirección</ion-label>
                    <ion-input v-model="form.address" />
                </ion-item>
            </ion-list>

            <ion-button expand="block" @click="submit" color="success">Guardar cambios</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { getProfile, createProfile } from '@/services/profileService';
import { useRouter } from 'vue-router';


const router = useRouter();

const form = ref({
    user_id: '',
    biography: '',
    phone_number: '',
    address: ''
});

onMounted(async () => {
    const profile = await getProfile();
    form.value = {
        user_id: profile.user_id,
        biography: profile.biography || '',
        phone_number: profile.phone_number || '',
        address: profile.address || ''
    };
});

const submit = async () => {
    try {
        await createProfile(form.value);
        router.back();
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
    }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

* {
    font-family: "Jaldi", sans-serif;
}
</style>
