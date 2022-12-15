import React from 'react';
import ToastView from './components/ToastView';
import {
  ToastType as TType,
  ToastProps,
  ToastViewProps,
  ToastViewRefProps,
} from './types';

const toastRef = React.createRef<ToastViewRefProps>();

export const Toast = (() => {
  const show = (props: ToastProps) => {
    if (toastRef.current) {
      toastRef.current.show(props);
    }
  };

  const hide = () => {
    if (toastRef.current) {
      toastRef.current.hide();
    }
  };

  return {
    show,
    hide,
  };
})();

export const ToastType = TType;

export const ToastComponent: React.FC<ToastViewProps> = (props) => {
  return <ToastView ref={toastRef} {...props} />;
};
