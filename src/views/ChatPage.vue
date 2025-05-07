<template>
  <ion-page>
    <!-- Cabecera con botón atrás y nombre de conversación -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button href="/tabs/messages" fill="clear">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="title">{{ chatTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Contenido del chat -->
    <ion-content class="chat-content"  fullscreen :scroll-events="true" keyborar-attach>
      <div class="message-list">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['message-item', { sent: msg.fromMe, received: !msg.fromMe }]"
        >
          <p class="message-text">{{ msg.text }}</p>
          <span class="message-time">{{ msg.time }}</span>
        </div>
      </div>
    </ion-content>

    <!-- Barra de entrada de mensaje -->
    <ion-footer ref="footerRef">
      <ion-toolbar class="input-toolbar" :style="footerStyle">
        <ion-item lines="none" class="input-item">
          <ion-input
            v-model="newMessage"
            placeholder="Escribe un mensaje..."
            @keydown.enter="sendMessage"
          />
          <ion-button slot="end" fill="clear" @click="sendMessage">
            <ion-icon :icon="sendOutline" />
          </ion-button>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref,nextTick, onMounted, onBeforeUnmount } from "vue";
import { Keyboard, KeyboardInfo } from "@capacitor/keyboard";
import { onIonViewDidEnter } from "@ionic/vue";
import { useRoute } from "vue-router";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
} from "@ionic/vue";
import { arrowBackOutline, sendOutline } from "ionicons/icons";

const footerRef = ref<HTMLElement>();
const footerStyle = ref({});
const contentRef = ref<any>();

const scrollToBottom = async () => {
  await nextTick();
  if (contentRef.value) {
    contentRef.value.$el.scrollToBottom(300); // scroll suave
  }
};

const showHandler = (info: KeyboardInfo) => {
  
  footerStyle.value = { transform: `translateY(-${info.keyboardHeight}px)` };
  contentRef.value?.scrollToBottom(300);
};

const hideHandler = () => {
  footerStyle.value = { transform: 'translateY(0)' };
};
onMounted(() => {
  Keyboard.addListener('keyboardWillShow', showHandler);
  Keyboard.addListener('keyboardWillHide', hideHandler);
});

onBeforeUnmount(() => {
  Keyboard.removeAllListeners();
});
const route = useRoute();

const chatId = route.params.id;
const chatTitle = ref<string>(`Chat #${chatId}`);

const newMessage = ref("");

// Mensajes de ejemplo
const messages = ref<
  Array<{ id: number; text: string; time: string; fromMe: boolean }>
>([
  { id: 1, text: "Hola, ¿cómo estás?", time: "10:00", fromMe: false },
  { id: 2, text: "Bien, gracias. ¿Y tú?", time: "10:01", fromMe: true },
  {
    id: 3,
    text: "Todo bien, gracias por preguntar.",
    time: "10:02",
    fromMe: false,
  },
]); 
onIonViewDidEnter(() => {
  scrollToBottom();
});
const sendMessage = () => {
  const text = newMessage.value.trim();
  if (!text) return;

  messages.value.push({
    id: Date.now(),
    text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    fromMe: true,
  });
  newMessage.value = "";

  scrollToBottom(); // desplazar hacia abajo después de enviar el mensaje

  
};
</script>

<style scoped>


ion-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
}


.chat-content {
  padding-bottom: 56px; /* Espacio para la barra de entrada */
}
.title {
  font-family: "Jaldi", sans-serif;
}

.chat-content {
  --background: #f5f8fd;
  padding: 1rem;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message-item {
  max-width: 75%;
  padding: 0.75rem 1rem;
  border-radius: 20px;
  position: relative;
  word-wrap: break-word;
  font-family: "Jaldi", sans-serif;
}

.message-item.sent {
  background-color: #429ef5;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 0;
}

.message-item.received {
  background-color: #ffffff;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 0;
}

.message-text {
  margin: 0;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.6;
  position: absolute;
  bottom: -1.25rem;
  right: 0.75rem;
}

.input-toolbar {
  background: #ffffff;
  padding: 0 0.5rem;
}

.input-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

ion-input {
  width: 100%;
}
</style>
