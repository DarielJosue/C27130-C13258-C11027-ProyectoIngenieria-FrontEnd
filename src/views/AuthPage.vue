<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isLogin ? "Iniciar sesión" : "Registrarse" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="login-container">
        <!-- Tabs -->
        <div class="tabs">
          <button @click="isLogin = true" :class="{ active: isLogin }">
            Iniciar sesión
          </button>

          <button @click="isLogin = false" :class="{ active: !isLogin }">
            Registrarse
          </button>
        </div>

        <transition name="slide-up" mode="out-in">
          <!-- Formulario de Login -->
          <form v-if="isLogin" @submit.prevent="handleLogin" key="login">
            <ion-list>
              <p>Usuario o correo</p>
              <ion-item>
                <ion-input type="text" placeholder="example@example.com" v-model="loginInput"></ion-input>
              </ion-item>

              <p>Clave</p>
              <ion-item :class="{ 'input-error': error }">
                <ion-input :type="showPassword ? 'text' : 'password'" placeholder="••••••••••••"
                  v-model="password"></ion-input>
                <ion-icon :icon="showPassword ? eyeOff : eye" @click="togglePassword"
                  class="password-toggle"></ion-icon>
              </ion-item>

              <div class="forgot-password">
                <a href="#">¿Olvidó la clave?</a>
              </div>
            </ion-list>

            <p v-if="error" class="error-message">{{ error }}</p>

            <ion-button type="submit" expand="block" class="ion-margin-top" :disabled="loading">
              <ion-spinner v-if="loading" name="dots"></ion-spinner>
              <span v-else>Ingresar</span>
            </ion-button>
            <div id="googleSignInDiv" class="google-login-button"></div>
          </form>

          <!-- Formulario de Registro -->
          <form v-else @submit.prevent="handleRegister" key="register">
            <ion-item>
              <ion-label>Tipo de usuario</ion-label>
              <ion-select v-model="loginUserType" interface="popover">
                <ion-select-option value="applicant">Candidato</ion-select-option>
                <ion-select-option value="company">Empresa</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-list>
              <p>Nombre</p>
              <ion-item>
                <ion-input type="text" placeholder="Juan" v-model="name"></ion-input>
              </ion-item>

              <p>Apellido</p>
              <ion-item>
                <ion-input type="text" placeholder="Pérez" v-model="lastname"></ion-input>
              </ion-item>

              <p>Nombre de usuario</p>
              <ion-item>
                <ion-input type="text" placeholder="juanperez123" v-model="username"></ion-input>
              </ion-item>

              <p>Correo electrónico</p>
              <ion-item>
                <ion-input type="email" placeholder="example@example.com" v-model="email"></ion-input>
              </ion-item>
              <p>Contraseña</p>
              <ion-item :class="{ 'input-error': passwordError }">
                <ion-input :type="showPassword ? 'text' : 'password'" placeholder="••••••••••••"
                  v-model="password"></ion-input>
                <ion-icon :icon="showPassword ? eyeOff : eye" @click="togglePassword"
                  class="password-toggle"></ion-icon>
              </ion-item>

              <p>Confirmar Contraseña</p>
              <ion-item :class="{ 'input-error': passwordError }">
                <ion-input :type="showConfirmPassword ? 'text' : 'password'" placeholder="••••••••••••"
                  v-model="confirmPassword"></ion-input>
                <ion-icon :icon="showConfirmPassword ? eyeOff : eye" @click="toggleConfirmPassword"
                  class="password-toggle"></ion-icon>
              </ion-item>
            </ion-list>

            <p v-if="passwordError" class="error-message">
              Las contraseñas no coinciden
            </p>
            <p v-if="error" class="error-message">{{ error }}</p>

            <ion-button type="submit" expand="block" class="ion-margin-top" :disabled="loading">
              <ion-spinner v-if="loading" name="dots"></ion-spinner>
              <span v-else>Registrarse</span>
            </ion-button>
          </form>
        </transition>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  login,
  registerApplicant,
  registerCompanyUser,
} from "@/services/authService.ts";
import { ref, computed, /*onMounted*/ } from "vue";
import { useRouter } from "vue-router";
import { eye, eyeOff } from "ionicons/icons";
import {
  IonPage,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner,
  IonIcon,
} from "@ionic/vue";
//import { loginWithGoogle } from '@/services/authService';
//import { useAuthStore } from "@/stores/authStore";


import { useNotificationService } from '@/services/NotificationService';
import { Capacitor } from "@capacitor/core";

const { initPush } = useNotificationService();
const loginUserType = ref("");

const router = useRouter();
const isLogin = ref(true);

// Variables para Login
const loginInput = ref("");
const password = ref("");
const showPassword = ref(false);

// Variables para Registro
const name = ref("");
const lastname = ref("");
const username = ref("");
const email = ref("");
const confirmPassword = ref("");
const showConfirmPassword = ref(false);
//const authStore = useAuthStore();
const loading = ref(false);
const error = ref("");

const passwordError = computed(() => {
  return (
    password.value !== confirmPassword.value && confirmPassword.value !== ""
  );
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// Métodos de formulario
const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    await login({
      loginInput: loginInput.value,
      password: password.value,
    });
    if (Capacitor.getPlatform() === "android") {
      await initPush();
    }

    router.push("/tabs/home");
  } catch (err) {
    console.error("Error en el login:", err);
    error.value = err.response?.data?.message || "Error de conexión";
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      error.value = "Las contraseñas no coinciden";
      return;
    }

    loading.value = true;
    error.value = "";
    if (loginUserType.value === "applicant") {
      await registerApplicant({
        name: name.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirmation: password.value,
      });
    } else {
      await registerCompanyUser({
        name: name.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirmation: password.value,
        company_id: null,
        role: "admin",
      });
    }
    if (Capacitor.getPlatform() === "android") {
      await initPush();
    }
    router.push("/tabs/home");
  } catch (err) {
    error.value = err.response?.data?.message || "Error en el registro";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
/*
const handleGoogleCallback = async (response) => {
  const idToken = response.credential;
  try {
    const { user, token } = await loginWithGoogle(idToken);
    authStore.setAuthData({
      user,
      token,
    });
    console.log("Login OK", user);
    router.push("/tabs/home");
  } catch (error) {
    console.error("Login fallido", error);
  }
};

console.log(window.location.origin)
onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
      }
    );
  } else {
    console.warn("Google SDK no cargado aún.");
  }
});
*/
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jaldi&display=swap");

/* transicion */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

button {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  cursor: pointer;
}

.tabs button.active {
  color: #4a75e7;
  border-bottom: 2px solid #4a75e7;
}

* {
  font-family: "Jaldi", sans-serif;
}

ion-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  margin: auto;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
  font-size: 18px;
}

.tab {
  color: #aaa;
  cursor: pointer;
}

.tab.active {
  color: #4a75e7;
  font-weight: bold;
  border-bottom: 2px solid #4a75e7;
}

ion-item {
  --border-radius: 12px;
  --highlight-height: 0;
  --padding-start: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
}

ion-item.input-error {
  border: 1px solid red;
}

ion-input {
  --padding-top: 10px;
  --padding-bottom: 10px;
}

ion-button {
  --background: #5f87e3;
  --color: #ffffff;
  --border-radius: 12px;
  font-weight: bold;
}

.forgot-password {
  text-align: right;
  margin-top: -10px;
  margin-bottom: 20px;
}

.forgot-password a {
  color: #4a75e7;
  font-size: 14px;
  text-decoration: none;
}

.password-toggle {
  font-size: 22px;
  color: #999;
  cursor: pointer;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

@media (min-width: 768px) {
  .login-container {
    max-width: 500px;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 16px;
    background: #fff;
  }
}
</style>
