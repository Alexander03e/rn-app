import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function UnmatchedRoute() {
    return (
        <View>
            <Text>Ошибка роута</Text>
            <Pressable>
                <Link href={'/'}>Вернуться на главную</Link>
            </Pressable>
        </View>
    );
}
