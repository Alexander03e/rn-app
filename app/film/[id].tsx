import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFilmsStore } from '../../entities/film/model/state';
import { Button } from '@/shared/components';
import { PlayIcon } from '../../assets/icons/play';
import { Bookmark } from '../../assets/icons/bookmark';
import { Colors } from '@/shared/tokens/colors';
import { useFavoriteStore } from '../../entities/favorite/model/state';
import { Film } from '../../entities/film/model';
import { FilmsGroup } from '../../entities/film/ui/Group';

export default function FilmPage() {
    const { id } = useLocalSearchParams();

    const [descOpen, setDescOpen] = useState(false);
    const { getDetailedFilm, mainFilms, detailedFilm } = useFilmsStore();
    const { films, addFilm, removeFilm } = useFavoriteStore();

    const isFavorite = films.find(
        item => String(item.id) == String(detailedFilm?.id),
    );

    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeFilm(String(detailedFilm?.id));
            return;
        }

        addFilm({ ...detailedFilm } as Film);
    };

    const [screenWidth, setScreenWidth] = useState(
        Dimensions.get('window').width,
    );

    useEffect(() => {
        getDetailedFilm(String(id));
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: detailedFilm?.poster?.url }}
                />

                <Text style={styles.name}>
                    {detailedFilm?.name} ({detailedFilm?.year})
                </Text>
                <View style={styles.toolbar}>
                    <Button
                        style={{ flex: 1 }}
                        icon={<PlayIcon />}
                        text='Смотреть'
                    />
                    <Button
                        style={{ flex: 1 }}
                        icon={<Bookmark />}
                        onPress={handleToggleFavorite}
                        text={isFavorite ? 'Из избранного' : 'В избранное'}
                    />
                </View>

                <View style={styles.content}>
                    <Text
                        style={{
                            height: !descOpen ? 150 : 'auto',
                            ...styles.desc,
                        }}
                    >
                        <Text>{detailedFilm?.description}</Text>
                    </Text>
                    <Button
                        onPress={() => setDescOpen(prev => !prev)}
                        textProps={{ style: { textAlign: 'center' } }}
                        variant='empty'
                        text={descOpen ? 'Свернуть' : 'Развернуть'}
                    />
                </View>
                <View style={styles.same}>
                    <FilmsGroup title='Похожие фильмы' films={mainFilms} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 24,
        color: 'white',
        fontWeight: 600,
        marginTop: 16,
    },
    desc: {
        overflow: 'hidden',
        color: Colors.primaryButtonText,
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    same: {
        marginTop: 32,
    },
    content: {
        position: 'relative',
        marginTop: 24,
    },
    image: {
        height: 400,
        marginInline: -16,
    },
    container: {
        padding: 16,
    },
    toolbar: {
        marginTop: 16,
        gap: 16,
        position: 'relative',
        flexDirection: 'row',
    },
});
