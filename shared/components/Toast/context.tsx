import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { View } from 'react-native';
import { Toast } from '.';

interface ToastContext {
    show: (msg: string) => void;
    error: (msg: string) => void;
    success: (msg: string) => void;
}

const ToastContext = createContext<ToastContext | undefined>(undefined);

export enum EVisible {
    DEFAULT = 'default',
    ERROR = 'error',
    SUCCESS = 'success',
}

const TOAST_TIMEOUT = 1500;

export type Config = {
    delay?: string;
};

type VisibleConfig = {
    status: boolean;
    variant?: EVisible;
};

type Props = {
    config?: Config;
    children: ReactNode;
};

export const ToastProvider = ({ children, config }: Props) => {
    const [visible, setVisible] = useState<VisibleConfig>({
        status: false,
    });

    const [message, setMessage] = useState<string>('');

    const hide = useCallback(() => {
        setVisible({ status: false });
    }, []);

    const show = useCallback((msg: string) => {
        setVisible({ status: true, variant: EVisible.DEFAULT });
        setMessage(msg);
    }, []);

    const error = useCallback((msg: string) => {
        setVisible({ status: true, variant: EVisible.ERROR });
        setMessage(msg);
    }, []);

    const success = useCallback((msg: string) => {
        setVisible({ status: true, variant: EVisible.SUCCESS });
        setMessage(msg);
    }, []);

    const memoizedValues = useMemo(
        () => ({
            error,
            success,
            show,
        }),
        [],
    );

    return (
        <ToastContext.Provider value={memoizedValues}>
            {visible.status && (
                <View>
                    <Toast
                        config={config}
                        message={message}
                        variant={visible?.variant || EVisible.DEFAULT}
                        onClose={hide}
                    />
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
