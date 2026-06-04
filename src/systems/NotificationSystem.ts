import { LocalNotifications } from '@capacitor/local-notifications';

export const NotificationSystem = {
  async requestPermissions() {
    try {
      const status = await LocalNotifications.requestPermissions();
      return status.display === 'granted';
    } catch (e) {
      console.warn('[NotificationSystem] Failed to request permissions (running in browser)', e);
      return false;
    }
  },

  async scheduleTaskCompletion(taskId: string, title: string, body: string, delayMs: number) {
    if (delayMs <= 0) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: this.generateHashId(taskId),
            schedule: { at: new Date(Date.now() + delayMs) },
            sound: 'default',
            attachments: [],
            actionTypeId: '',
            extra: null,
          },
        ],
      });
      console.log(`[NotificationSystem] Scheduled: ${title} in ${delayMs}ms`);
    } catch (e) {
      console.warn('[NotificationSystem] Failed to schedule notification (running in browser)', e);
    }
  },

  async cancelNotification(taskId: string) {
    try {
      await LocalNotifications.cancel({
        notifications: [{ id: this.generateHashId(taskId) }],
      });
    } catch (e) {
      // Silently fail if not on native
    }
  },

  // Helper to turn string taskId into numeric ID for Android
  generateHashId(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (str.charCodeAt(i) + (hash << 5) - hash) & 0x7FFFFFFF;
    }
    return hash;
  }
};
