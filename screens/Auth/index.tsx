import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Toast } from '../../shared/components';
import { useToast } from '@/shared/components/Toast/context';
import { Colors } from '@/shared/tokens/colors';

export const AuthScreen = () => {
    const { show } = useToast();
    return (
        <View style={styles.container}>
            <StatusBar />
            <Input placeholder='E-mail' />
            <Input placeholder='Пароль' type='password' />
            <Button
                text='Войти'
                onPress={() => {
                    show('Show');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
