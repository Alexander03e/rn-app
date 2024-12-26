import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@/shared/components/Input';
import { Colors } from '@/shared/tokens/colors';

describe('Input Component', () => {
    it('должен отображать лэйбл, если она передана', () => {
        const { getByText } = render(<Input label='Test Label' />);
        expect(getByText('Test Label')).toBeTruthy();
    });

    it('должен изменять состояние фокуса при фокусировке и потере фокуса', () => {
        const { getByPlaceholderText } = render(
            <Input placeholder='Test Input' />,
        );
        const input = getByPlaceholderText('Test Input');

        fireEvent(input, 'focus');
        expect(input.props.style).toContainEqual({
            borderColor: Colors.accentFirst,
            borderWidth: 2,
        });

        fireEvent(input, 'blur');
        expect(input.props.style).not.toContainEqual({
            borderColor: Colors.accentFirst,
            borderWidth: 2,
        });
    });

    it('должен переключать видимость пароля при нажатии на иконку', () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input type='password' placeholder='Password' />,
        );
        const input = getByPlaceholderText('Password');
        const eyeIcon = getByTestId('eye-icon');

        expect(input.props.secureTextEntry).toBe(true);

        fireEvent.press(eyeIcon);
        expect(input.props.secureTextEntry).toBe(false);

        fireEvent.press(eyeIcon);
        expect(input.props.secureTextEntry).toBe(true);
    });
});
