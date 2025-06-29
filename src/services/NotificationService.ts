import { ref } from 'vue';
import { PushNotifications, PushNotificationSchema, PushNotificationToken } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import apiClient from './apiClient';

const notifications = ref<PushNotificationSchema[]>([]);

export const useNotificationService = () => {
    const initPush = async () => {
        const permStatus = await PushNotifications.requestPermissions();
        if (permStatus.receive !== 'granted') {
            console.warn('Permiso para notificaciones denegado');
            return;
        }

        await PushNotifications.register();

        PushNotifications.addListener('registration', async (token: PushNotificationToken) => {
            console.log('📱 Token recibido:', token.value);

            try {
                await apiClient.post('/device-tokens', {
                    token: token.value,
                });
                console.log('Token guardado en el backend');
            } catch (error) {
                console.error('Error al guardar el token:', error);
            }
        });

        PushNotifications.addListener('registrationError', (error) => {
            console.error('Error al registrar notificaciones push:', error);
        });

        PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
            console.log('📨 Notificación recibida:', notification);
            notifications.value.unshift(notification);

            await LocalNotifications.schedule({
                notifications: [{
                    id: Date.now(),
                    title: notification.title ?? 'Notificación',
                    body: notification.body ?? '',
                    extra: notification.data,
                }],
            });
        });

        PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
            console.log('Acción sobre la notificación:', action);
        });
    };

    const getNotifications = () => notifications;

    const loadStoredNotifications = async () => {
        try {
            const response = await apiClient.get('/notificaciones');
            const data = response.data;

            const parsed = data.map((notif: any) => ({
                title: notif.title,
                body: notif.body,
                data: notif.data,
                id: notif.id,
            }));

            notifications.value = parsed.concat(notifications.value);
        } catch (error) {
            console.error('Error al cargar notificaciones:', error);
        }
    };

    return {
        initPush,
        getNotifications,
        loadStoredNotifications,
    };
};
