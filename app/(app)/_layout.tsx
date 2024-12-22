import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { TabBar } from '@/shared/components/TabBar/TabBar';
import { Colors } from '@/shared/tokens/colors';

export default function HomeLayout() {
    return (
        <Tabs
            tabBar={({ state, navigation, descriptors }) => (
                <TabBar
                    descriptors={descriptors}
                    navigation={navigation}
                    state={state}
                />
            )}
            screenOptions={{
                sceneStyle: {
                    backgroundColor: Colors.primary,
                    padding: 16,
                    flex: 1,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen name='index' options={{ title: 'Главная' }} />
            <Tabs.Screen name='library' options={{ title: 'Библиотека' }} />
            <Tabs.Screen name='favorites' options={{ title: 'Избранное' }} />
        </Tabs>
    );
}
