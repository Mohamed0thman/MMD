type MessageHelpers = {showMessage: () => void; hideMessage: () => void};

class FlashMessageManager<T> {
  preservedFlashMessages: T[] = [];
  currentFlashMessage: MessageHelpers | null = null;
  enabled: boolean = true;

  get isEnabled(): boolean {
    return this.enabled;
  }

  register(instance: MessageHelpers | null): void {
    if (!this.currentFlashMessage) {
      this.currentFlashMessage = instance;
    }
  }

  getCurrent(): MessageHelpers | null {
    return this.currentFlashMessage;
  }
}

const flashMessageManager = new FlashMessageManager();

export {flashMessageManager, type MessageHelpers};
