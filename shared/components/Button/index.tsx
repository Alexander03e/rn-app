import {
    Animated,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
} from 'react-native';
import { Paddings, Radius } from '../../tokens/size';
import { Colors } from '../../tokens/colors';

type Props = PressableProps & {
    variant?: 'empty' | 'filled';
    text?: string;
};

export const Button = ({ variant = 'filled', text = '', ...props }: Props) => {
    const animatedValue = new Animated.Value(100);

    const color = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [Colors.accentFirst, Colors.primarySpecial],
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
        <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
            <Animated.View style={{ ...styles.button, backgroundColor: color }}>
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.primaryButtonText,
    },
    button: {
        borderRadius: Radius.x1,
        backgroundColor: Colors.primarySpecial,
        paddingHorizontal: Paddings.inlineX1,
        paddingVertical: Paddings.blockX2,
    },
});
