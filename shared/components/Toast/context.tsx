import {
    createContext,
    memo,
    PropsWithChildren,
    useContext,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Animated, View } from 'react-native';
import { Toast } from '.';

interface ToastContext {
    // visible: boolean;
    // message: string;
    show: () => void;
    // error: () => void;
    // warn: () => void;
    // success: () => void;
}

const ToastContext = createContext<ToastContext | undefined>(undefined);

export type ToastHandlers = {
    show: () => void;
    hide: () => void;
};

const TOAST_TIMEOUT = 1500;

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const animation = new Animated.Value(0);
    const toastRef = useRef<ToastHandlers>(null);

    const hide = () => {
        toastRef.current?.hide();
        setVisible(false);
    };

    const show = () => {
        toastRef.current?.show();
        const promise = new Promise((resolve, reject) => {
            setVisible(true);
            setTimeout(() => {
                resolve('TOAST_CLOSE');
            }, TOAST_TIMEOUT);
        });

        promise.then(() => hide());
    };

    const memoizedValues = useMemo(
        () => ({
            // visible,
            // message,
            show,
        }),
        [visible, message],
    );

    return (
        <ToastContext.Provider value={memoizedValues}>
            {visible && (
                <View>
                    <Toast ref={toastRef} />
                </View>
            )}
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('Хук вызван вне контекста ToastContext');
    }

    return context;
};
