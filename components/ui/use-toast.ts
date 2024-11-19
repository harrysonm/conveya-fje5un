"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { create } from "zustand";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
};

type ToastActionElement = React.ReactElement<{
  toast: ToasterToast;
}>;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type State = {
  toasts: ToasterToast[];
};

type Action =
  | {
      type: typeof actionTypes.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
      id: string;
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST;
      toastId?: string;
    };

interface Toast extends Omit<ToasterToast, "id"> {}

const toastStore = create<State>(() => ({
  toasts: [],
}));

function dispatch(action: Action) {
  toastStore.setState((state) => {
    switch (action.type) {
      case actionTypes.ADD_TOAST:
        return {
          ...state,
          toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
        };

      case actionTypes.UPDATE_TOAST:
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === action.id ? { ...t, ...action.toast } : t
          ),
        };

      case actionTypes.DISMISS_TOAST: {
        const { toastId } = action;

        if (toastId) {
          return {
            ...state,
            toasts: state.toasts.filter((t) => t.id !== toastId),
          };
        }
        return {
          ...state,
          toasts: [],
        };
      }

      case actionTypes.REMOVE_TOAST:
        if (action.toastId === undefined) {
          return {
            ...state,
            toasts: [],
          };
        }
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== action.toastId),
        };
    }
  });
}

function toast(props: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      id,
      toast: props,
    });

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      duration: props.duration || 5000,
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);

  React.useEffect(() => {
    return toastStore.subscribe((state) => {
      setToasts(state.toasts);
    });
  }, []);

  return {
    toast,
    toasts,
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };