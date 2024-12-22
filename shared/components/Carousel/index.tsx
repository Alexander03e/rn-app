import {
    ImageBackground,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Film } from '../../../entities/film/model';
import Swiper from 'react-native-swiper';
import { Button } from '@/shared/components';
import { Bookmark } from '../../../assets/icons/bookmark';
import { Colors } from '@/shared/tokens/colors';
import {
    Canvas,
    Rect,
    LinearGradient,
    Skia,
    Shader,
    vec,
} from '@shopify/react-native-skia';
import { useState } from 'react';
import { PlayIcon } from '../../../assets/icons/play';
import { router } from 'expo-router';

type Slide = Pick<
    Film,
    'poster' | 'name' | 'description' | 'rating' | 'year' | 'id'
>;

type Props = {
    slides?: Slide[];
};

export const Carousel = ({ slides }: Props) => {
    return (
        <View style={{}}>
            {slides && (
                <Swiper
                    containerStyle={{ marginBottom: 16 }}
                    style={styles.wrapper}
                    showsButtons={false}
                    showsPagination={false}
                >
                    {slides?.map((item, index) => (
                        <Slide key={index} {...item} />
                    ))}
                </Swiper>
            )}
        </View>
    );
};

export const Slide = ({
    poster,
    name,
    rating,
    year,
    description,
    id,
}: Slide) => {
    const [slideSize, setSlideSize] = useState<{
        height: number;
        width: number;
    } | null>();

    const handleClick = () => {
        router.push(`film/${id}`);
    };

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height, width } = event.nativeEvent.layout;
        setSlideSize({ height, width });
    };

    return (
        <View style={styles.slide}>
            <ImageBackground
                style={styles.image}
                source={{ uri: poster?.url }}
                onLayout={handleLayout}
            >
                {slideSize && (
                    <Canvas style={styles.canvas}>
                        <Rect
                            x={0}
                            y={0}
                            width={slideSize.width}
                            height={slideSize.height}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: slideSize.height / 1.4 }}
                                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                            />
                        </Rect>
                    </Canvas>
                )}
                <View style={styles.info}>
                    <Text style={styles.name}>
                        {name} ({year})
                    </Text>
                    <Text style={styles.name}>Рейтинг: {rating.imdb}</Text>
                    <View style={styles.buttons}>
                        <Button
                            icon={<PlayIcon />}
                            background={{
                                default: 'rgba(0,0,0,0.05)',
                                hover: 'rgba(0,0,0,0.2)',
                            }}
                            style={{
                                borderWidth: 1,
                                overflow: 'hidden',
                                borderRadius: 12,
                                flex: 1,
                                borderColor: 'white',
                            }}
                            onPress={handleClick}
                            text='Смотреть'
                        />
                        <Button
                            background={{ default: Colors.accentFourth }}
                            icon={<Bookmark />}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 550,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    slide: {
        borderRadius: 16,
        height: '100%',
        overflow: 'hidden',
    },
    buttons: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        gap: 16,
        justifyContent: 'space-between',
    },
    info: {
        marginTop: 'auto',
        gap: 12,
        borderRadius: 16,
        padding: 10,
    },
    name: {
        color: 'white',
        fontWeight: 700,
        // width: '70%',
        fontSize: 20,
    },
    image: {
        borderRadius: 16,

        height: '100%',
    },
});
