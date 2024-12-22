import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function FilmPage() {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>{id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
