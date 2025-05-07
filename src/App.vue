<template>
  <ion-app>
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const transitionName = ref('fade');

  watch(() => route.path, (newPath, oldPath) => {
    // transiciones 
    transitionName.value = newPath === '/login' && oldPath === '/register' ? 'slide-right' : 'slide-left';
  });

</script>
<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transición de deslizamiento (slide) */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.tabs .tab {
  text-decoration: none; /* Elimina subrayado de enlace */
  color: #aaa;
  cursor: pointer;
}

.tabs .tab.active {
  color: #4a75e7;
  font-weight: bold;
  border-bottom: 2px solid #4a75e7;
} 
</style>
