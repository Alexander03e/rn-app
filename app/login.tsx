import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
// import { Button, Input, Toast };
import { useToast } from '@/shared/components/Toast/context';
import { Colors } from '@/shared/tokens/colors';
import { useForm } from '@/shared/hooks/useForm';
import { Button, Input } from '@/shared/components';
import { router } from 'expo-router';

interface IForm {
    email: string;
    password: string;
}

function Login() {
    const { success, error } = useToast();
    const { formData, register } = useForm<IForm>({});

    const onSubmit = () => {
        if (formData?.email && formData?.password) {
            router.push('/');
            return;
        }
        error('Введите данные для входа');
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Input {...register('email')} placeholder='E-mail' />
            <Input
                {...register('password')}
                placeholder='Пароль'
                type='password'
            />
            <Button text='Войти' onPress={onSubmit} />
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        gap: 16,
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
