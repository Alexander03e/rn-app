import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Film } from '../model';
import { Colors } from '@/shared/tokens/colors';
import { router } from 'expo-router';
import { Button } from '@/shared/components';
import { useState } from 'react';
import { useFavoriteStore } from '../../favorite/model/state';

interface IProps extends Film {
    onPress?: (id: number | null) => void;
    isPressed?: boolean;
}

export const FilmCard = ({ onPress, isPressed, ...film }: IProps) => {
    const { addFilm, removeFilm, films } = useFavoriteStore();

    const isFavorite = films.find(item => item.id === film.id);

    const handleClick = () => {
        router.push(`film/${id}`);
    };

    const handleFavorite = () => {
        if (isFavorite) {
            removeFilm(String(film.id));
            return;
        }

        addFilm(film);
    };

    const handlePress = () => {
        if (!onPress) return;
        if (isPressed) {
            onPress(null);
            return;
        }
        onPress(id);
    };

    const { id, poster, name, year, shortDescription } = film;
    return (
        <Pressable style={{ flex: 1 }} onPress={handlePress}>
            <View style={styles.outWrapper}>
                <View style={styles.container}>
                    {isPressed && (
                        <View style={styles.toolbar}>
                            <Button onPress={handleClick} text='Смотреть' />
                            <Button
                                background={{
                                    default: isFavorite
                                        ? Colors.accentFirst
                                        : Colors.accentThird,
                                }}
                                onPress={handleFavorite}
                                text={
                                    isFavorite ? 'Из избранного' : 'В избранное'
                                }
                            />
                        </View>
                    )}
                    <Image
                        style={{
                            ...styles.image,
                            opacity: isPressed ? 0.2 : 1,
                        }}
                        source={{ uri: poster?.url }}
                    />
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
    toolbar: {
        top: 0,
        left: 0,
        zIndex: 2,
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
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
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
    },
});
