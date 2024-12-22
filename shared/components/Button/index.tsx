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
    textColor?: string;
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
    const { style: textStyle, ...textRest } = textProps || {};
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
            <Animated.View
                style={{
                    ...styles?.[variant],
                    backgroundColor: variant === 'filled' ? color : '',
                }}
            >
                {icon}
                {text && (
                    <Text
                        style={{
                            ...styles?.[`text${variant}`],
                            ...textStyle,
                        }}
                        {...textRest}
                    >
                        {text}
                    </Text>
                )}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    textfilled: {
        color: Colors.primaryButtonText,
    },
    textempty: {
        color: Colors.primarySpecial,
    },
    filled: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        borderRadius: Radius.x1,
        backgroundColor: Colors.primarySpecial,
        paddingHorizontal: Paddings.inlineX1,
        paddingVertical: Paddings.blockX2,
    },
    empty: {
        backgroundColor: 'transparent',
        color: Colors.primarySpecial,
        padding: 4,
    },
});
