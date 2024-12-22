import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Film } from '../model';
import { FilmCard } from './Card';
import { Colors } from '@/shared/tokens/colors';
import { useState } from 'react';

interface IProps {
    films?: Film[];
    title?: string;
    isVertical?: boolean;
}

export const FilmsGroup = ({ title, isVertical, films }: IProps) => {
    const [pressedFilm, setPressedFilm] = useState<number | null>(null);
    const renderFilm = ({ item }: { item: Film }) => {
        return (
            <FilmCard
                onPress={setPressedFilm}
                isPressed={item.id === pressedFilm}
                {...item}
            />
        );
    };

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <FlatList
                numColumns={isVertical ? 2 : undefined}
                horizontal={!isVertical}
                contentContainerStyle={{
                    columnGap: 16,

                    rowGap: 24,
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
