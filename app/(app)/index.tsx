import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useFilmsStore } from '../../entities/film/model/state';
import { FilmCard } from '../../entities/film/ui/Card';
import { Film } from '../../entities/film/model';
import { FilmsGroup } from '../../entities/film/ui/Group';
import { Carousel } from '@/shared/components/Carousel';

export default function Home() {
    const { getMainFilms, mainFilms } = useFilmsStore();
    useEffect(() => {
        getMainFilms();
    }, []);

    const renderFilm = ({ item }: { item: Film }) => {
        return <FilmCard {...item} />;
    };
    return (
        <ScrollView>
            <Carousel slides={mainFilms} />
            <View style={styles.container}>
                {mainFilms && mainFilms?.length > 0 && (
                    <FilmsGroup films={mainFilms} title={'Классика'} />
                )}

                {mainFilms && mainFilms?.length > 0 && (
                    <FilmsGroup
                        films={[...mainFilms].reverse()}
                        title={'Популярные фильмы'}
                    />
                )}
                {mainFilms && mainFilms?.length > 0 && (
                    <FilmsGroup films={mainFilms} title={'Фильмы 2000-х'} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 16,
    },
});
