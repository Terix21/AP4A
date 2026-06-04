import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const HapticFeedback = {
  async triggerSelection() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {
      console.log('[HapticFeedback] Light selection impact triggered');
    }
  },

  async triggerImpact() {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (e) {
      console.log('[HapticFeedback] Medium impact triggered');
    }
  },

  async triggerHeavyImpact() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) {
      console.log('[HapticFeedback] Heavy impact triggered');
    }
  },

  async triggerSuccess() {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch (e) {
      console.log('[HapticFeedback] Success notification haptic triggered');
    }
  },

  async triggerWarning() {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch (e) {
      console.log('[HapticFeedback] Warning notification haptic triggered');
    }
  },

  async triggerError() {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch (e) {
      console.log('[HapticFeedback] Error notification haptic triggered');
    }
  }
};
