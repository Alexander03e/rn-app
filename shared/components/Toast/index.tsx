import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Paddings, Radius } from '../../tokens/size';
import { Colors } from '../../tokens/colors';
import CloseIcon from '../../../assets/icons/close';
import { Config, EVisible } from './context';

type Props = {
    onClose: () => void;
    message: string;
    variant: EVisible;
    config?: Config;
};

export const Toast = ({ onClose, variant, message, config }: Props) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const delay = +(config?.delay || 1000);

    function show() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(hide, delay);
        });
    }

    function hide() {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(onClose);
    }

    useEffect(() => {
        show();
    }, []);

    return (
        <Animated.View
            style={[{ ...styles.container, opacity }, styles[variant]]}
        >
            <Text style={styles.text}>{message}</Text>
            <Pressable onPress={hide}>
                <CloseIcon />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    [EVisible.DEFAULT]: {
        backgroundColor: Colors.accentSecond,
    },
    [EVisible.ERROR]: {
        backgroundColor: Colors.primarySpecial,
    },
    [EVisible.SUCCESS]: {
        backgroundColor: Colors.accentFirst,
    },
    text: {
        display: 'flex',
        width: '90%',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        zIndex: 2,
        position: 'absolute',
        top: Paddings.inlineX2,
        padding: Paddings.container,
        width: '80%',
        borderRadius: Radius.x2,
        transform: [{ translateX: '-50%' }],
        left: '50%',
    },
});
