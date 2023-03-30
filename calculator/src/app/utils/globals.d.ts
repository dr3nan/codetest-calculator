declare global {
  interface Window {
    alert: (message?: string) => void;
  }
}

export const alert = window.alert;
