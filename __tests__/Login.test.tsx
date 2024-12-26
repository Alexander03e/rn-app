import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../app/login';
import { ToastProvider } from '@/shared/components/Toast/context';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(),
    },
}));

describe('Интеграционный тест для Login', () => {
    it('должен отображать сообщение об ошибке, если email или пароль отсутствуют', async () => {
        const { getByPlaceholderText, getByText } = render(
            <ToastProvider>
                <Login />
            </ToastProvider>,
        );

        fireEvent.changeText(
            getByPlaceholderText('E-mail'),
            'test@example.com',
        );
        fireEvent.press(getByText('Войти'));

        await waitFor(() => {
            expect(getByText('Введите данные для входа')).toBeTruthy();
        });
    });

    it('должен перейти на главную страницу при успешном входе', async () => {
        const { getByPlaceholderText, getByText } = render(
            <ToastProvider>
                <Login />
            </ToastProvider>,
        );

        fireEvent.changeText(
            getByPlaceholderText('E-mail'),
            'test@example.com',
        );
        fireEvent.changeText(getByPlaceholderText('Пароль'), 'password123');
        fireEvent.press(getByText('Войти'));

        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith('/');
        });
    });
});
