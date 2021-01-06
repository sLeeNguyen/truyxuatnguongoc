import { store } from 'react-notifications-component';

const settings = {
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 2000,
        onScreen: false,
        showIcon: true,
    }
}

export function notifySuccess(title, message) {
    store.addNotification({
        title: title,
        message: message,
        type: "success",
        ...settings
      });
}

export function notifyWarning(title, message) {
    store.addNotification({
        title: title,
        message: message,
        type: "warning",
        ...settings
      });
}

export function notifyError(title, message) {
    store.addNotification({
        title: title,
        message: message,
        type: "danger",
        ...settings
      });
}

export function notifyInfo(title, message) {
    store.addNotification({
        title: title,
        message: message,
        type: "info",
        ...settings
      });
}