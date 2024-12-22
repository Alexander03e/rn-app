import {
    Animated,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    TextProps,
} from 'react-native';
import { Paddings, Radius } from '../../tokens/size';
import { Colors } from '../../tokens/colors';
import { ReactElement } from 'react';

type Props = PressableProps & {
    variant?: 'empty' | 'filled';
    text?: string;
    icon?: ReactElement;
    textProps?: TextProps;
    background?: {
        hover?: string;
        default?: string;
    };
};

export const Button = ({
    variant = 'filled',
    text = '',
    icon,
    style,
    textProps,
    background,
    ...props
}: Props) => {
    const animatedValue = new Animated.Value(100);

    const color = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [
            background?.hover || Colors.accentFirst,
            background?.default || Colors.primarySpecial,
        ],
    });

    const fadeIn = (e: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start();
        props.onPressIn && props?.onPressIn(e);
    };

    const fadeOut = (e: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 150,
            useNativeDriver: true,
        }).start();
        props.onPressOut && props?.onPressOut(e);
    };

    return (
        <Pressable
            style={style}
            onPressIn={fadeIn}
            onPressOut={fadeOut}
            {...props}
        >
            <Animated.View style={{ ...styles.button, backgroundColor: color }}>
                {icon}
                {text && (
                    <Text style={styles.text} {...textProps}>
                        {text}
                    </Text>
                )}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.primaryButtonText,
    },
    button: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        borderRadius: Radius.x1,
        backgroundColor: Colors.primarySpecial,
        paddingHorizontal: Paddings.inlineX1,
        paddingVertical: Paddings.blockX2,
    },
});
