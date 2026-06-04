import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const HapticFeedback = {
  async triggerSelection() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {
      // Graceful fallback for non-native web environments
      console.log('[HapticFeedback] Light selection impact triggered (stubbed on browser)');
    }
  },

  async triggerSuccess() {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch (e) {
      console.log('[HapticFeedback] Success notification haptic triggered (stubbed on browser)');
    }
  },

  async triggerWarning() {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch (e) {
      console.log('[HapticFeedback] Warning notification haptic triggered (stubbed on browser)');
    }
  }
};
