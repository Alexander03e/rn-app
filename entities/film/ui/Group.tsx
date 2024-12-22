import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Film } from '../model';
import { FilmCard } from './Card';
import { Colors } from '@/shared/tokens/colors';

interface IProps {
    films: Film[];
    title?: string;
}

export const FilmsGroup = ({ title, films }: IProps) => {
    const renderFilm = ({ item }: { item: Film }) => {
        return <FilmCard {...item} />;
    };
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <FlatList
                horizontal
                contentContainerStyle={{
                    gap: 12,
                }}
                data={films}
                renderItem={renderFilm}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 8,
    },
    title: {
        color: Colors.primaryButtonText,
        fontSize: 20,
        fontWeight: 700,
    },
});
