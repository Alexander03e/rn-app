import { StyleSheet, Text, TextInput, View, StatusBar } from 'react-native';
import { Button, Input, Toast } from './shared/components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './shared/tokens/colors';
import { AuthScreen } from './screens/Auth';
import { ToastProvider } from './shared/components/Toast/context';

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeContainer}>
                {/* <Toast /> */}

                <ToastProvider>
                    <AuthScreen />
                </ToastProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        // marginTop: StatusBar.currentHeight,
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
