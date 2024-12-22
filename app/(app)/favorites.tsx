import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '@/shared/components/Typography';
import { useFavoriteStore } from '../../entities/favorite/model/state';
import { FilmsGroup } from '../../entities/film/ui/Group';
import { Film } from '../../entities/film/model';

export default function Favorites() {
    const { films } = useFavoriteStore();
    return (
        <View style={styles.container}>
            <Typography variant='title'>Список избранного</Typography>

            {films?.length > 0 ? (
                <FilmsGroup isVertical={true} films={films as Film[]} />
            ) : (
                <Typography variant={'p'}>Список пока пуст</Typography>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 24,
    },
});
