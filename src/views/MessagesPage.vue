<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="search-bar">
          <ion-icon :icon="arrowBackOutline" class="icon-btn" />
          <ion-searchbar class="search-input" placeholder="Buscar mensajes" />
          <router-link to="/profile">
            <ion-avatar class="avatar-btn">
              <ion-icon :icon="personOutline" />
            </ion-avatar>
          </router-link>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Filtros -->
      <div class="filter-bar">
        <ion-button fill="solid" class="filter-btn" size="small">
          <ion-icon :icon="calendarOutline" slot="start" />
          Por fecha
        </ion-button>
        <ion-button fill="solid" class="filter-btn" size="small">
          <ion-icon :icon="chevronDownOutline" slot="start" />
          No leídos
        </ion-button>
      </div>

      <!-- Lista de mensajes -->
      <ion-list>
        <router-link
          v-for="i in 6"
          :key="i"
          :to="`/tabs/chat/${i}`"
          class="ion-text-decoration-none"
        >
          <ion-item class="message-item">
            <ion-avatar slot="start">
              <ion-icon :icon="personOutline" class="avatar-icon" />
            </ion-avatar>
            <ion-label>
              <h2>Nombre Apellido</h2>
              <p>Previsualización de mensaje</p>
            </ion-label>
          </ion-item>
        </router-link>
      </ion-list>

      <!-- Botón flotante -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openNewMessageModal">
          <ion-icon :icon="addOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>

    <!-- Modal para nuevo mensaje -->
    <ion-modal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>Nuevo Mensaje</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isModalOpen = false">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <h3>Seleccionar destinatarios</h3>
        <ion-radio-group v-model="selectedUser">
          <div class="debug">Usuario seleccionado: {{ selectedUser }}</div>
          <ion-list>
            <ion-item
              v-for="user in users"
              :key="user.user_id"
              @click="selectedUser = user.user_id"
            >
              <!--  <ion-avatar slot="start"> <img :src="user.avatar" /> colocar cuadno hayan imagenes de perfil!!!    </ion-avatar> -->
              <ion-label>
                <h2>{{ user.name }}{{ user.lastname }}</h2>
                <p>{{ user.email }}</p>
              </ion-label>
              <ion-radio slot="end" :value="user.user_id" />
            </ion-item>
          </ion-list>
        </ion-radio-group>

        <ion-item>
          <ion-label position="stacked">Mensaje</ion-label>
          <ion-textarea
            v-model="messageText"
            placeholder="Escribe tu mensaje aquí..."
            @ionInput="handleTextInput($event)"
            data-testid="message-input"
          ></ion-textarea>
        </ion-item>
        <ion-button expand="block" @click="sendMessage">Enviar</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import {
  IonSearchbar,
  IonRadio, // para el radio button
  IonRadioGroup,
  IonAvatar,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonTextarea,
} from "@ionic/vue";
import {
  arrowBackOutline,
  personOutline,
  calendarOutline,
  chevronDownOutline,
  addOutline,
} from "ionicons/icons";

const isModalOpen = ref(false);
const users = ref<
  Array<{
    user_id: number;
    name: string;
    lastname: string;
    email: string;
  }>
>([]); /* ¡DESPUÉS SE PUEDE AGREGAR LA IMAGEN DE PERFIL! */

const selectedUser = ref<number | null>(null); 
const messageText = ref("");
const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("authToken");

const openNewMessageModal = () => {
  isModalOpen.value = true;
  selectedUser.value = null;
  messageText.value = "";
};
const handleTextInput = (event: CustomEvent) => {
  console.log("Evento input:", event.detail.value); // 🐛
  messageText.value = event.detail.value;
};


onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    users.value = response.data.map((user: any) => ({
      user_id: Number(user.user_id),
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    }));
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
});



const sendMessage = async () => {
  console.log("Tipo de selectedUser:", typeof selectedUser.value); // 🐛
  console.log("Valor de selectedUser:", selectedUser.value); // 🐛
  console.log("Texto del mensaje:", messageText.value.trim()); // 🐛
  if (!selectedUser.value || !messageText.value.trim()) {
    alert("Selecciona un destinatario y escribe un mensaje.");
    return;
  }

  try {
    await axios.post(`${API_URL}/messages/send`, {
      recipient_id: selectedUser.value, // solo un ID
      message: messageText.value.trim(),
    });


    alert("Mensaje enviado correctamente");
        
        messageText.value = "";
    selectedUser.value = null; 
    isModalOpen.value = false;
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    alert("Hubo un error al enviar el mensaje.");
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

/* Barra de búsqueda */
.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8px;
  gap: 8px;
  background-color: #648ddb;
  height: 56px;
  box-sizing: border-box;
}
* {
  font-family: "Jaldi", sans-serif;
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

/* Filtros */
.filter-bar {
  display: flex;
  gap: 10px;
  padding: 10px 16px;
  background-color: #648ddb;
}

.filter-btn {
  --background: #429ef5;
  --color: white;
  --border-radius: 10px;
}

/* Lista de mensajes */
.message-item {
  --background: white;
  --min-height: 60px;
}

.avatar-icon {
  font-size: 24px;
  color: gray;
}

/* Botón flotante */
ion-fab-button {
  --background: #429ef5;
  --color: white;
}
ion-button {
  --background: #5f87e3;
  --color: #ffffff;
  --border-radius: 12px;
  font-weight: bold;
}
ion-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
