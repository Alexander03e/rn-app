import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Film } from '../model';
import { Colors } from '@/shared/tokens/colors';
import { router } from 'expo-router';

interface IProps extends Film {}

export const FilmCard = ({
    id,
    poster,
    name,
    year,
    shortDescription,
}: IProps) => {
    const handleClick = () => {
        router.push(`film/${id}`);
    };
    return (
        <Pressable onPress={handleClick}>
            <View style={styles.outWrapper}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: poster?.url }} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {name} ({year})
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    titleContainer: {},
    title: {
        textAlign: 'center',
        color: Colors.primaryButtonText,
    },
    outWrapper: {
        flexDirection: 'column',
        gap: 4,
        aspectRatio: 3 / 5,
        height: 240,
    },
    container: {
        height: 200,
        overflow: 'hidden',
        borderRadius: 12,
    },
});
