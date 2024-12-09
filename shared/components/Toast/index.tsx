import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';
import { Paddings, Radius } from '../../tokens/size';
import { Colors } from '../../tokens/colors';
import CloseIcon from '../../../assets/icons/close';
import { ToastHandlers } from './context';

type Props = {
    // hide: () => void;
};

export const Toast = forwardRef<ToastHandlers, Props>((props, ref) => {
    const offset = useRef(new Animated.Value(40)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    function show() {
        alert('r');
        // Animated.timing(offset, {
        //     toValue: 0,
        //     duration: 400,
        //     useNativeDriver: true,
        // });
    }

    function hide() {
        Animated.timing(opacity, {
            toValue: Paddings.container + 20,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    useEffect(() => {
        hide();
    }, []);

    return (
        <Animated.View style={{ ...styles.container, opacity }}>
            <Text style={styles.text}>text</Text>
            <CloseIcon />
        </Animated.View>
    );
});

const styles = StyleSheet.create({
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
        backgroundColor: Colors.accentFirst,
    },
});
