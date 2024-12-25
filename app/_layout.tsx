import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/tokens/colors';
import { ToastProvider } from '@/shared/components/Toast/context';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { setBackgroundColorAsync } from 'expo-system-ui';

function RootLayout() {
    useEffect(() => {
        setBackgroundColorAsync(Colors.primary);

        router.push('login');
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeContainer}>
                <ToastProvider>
                    <Stack
                        screenOptions={{
                            contentStyle: {
                                backgroundColor: Colors.primary,
                            },
                            presentation: 'card',
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name='(app)' />
                        <Stack.Screen
                            name='film/[id]'
                            options={{
                                headerShown: true,
                                title: '',
                                headerBackTitle: 'Назад',
                                headerTintColor: Colors.primarySpecial,
                                headerStyle: {
                                    backgroundColor: 'black',
                                },
                            }}
                        />
                    </Stack>
                </ToastProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default RootLayout;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'blue',
    },
});
