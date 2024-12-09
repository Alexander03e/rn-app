import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../tokens/colors';
import EyeOpenedIcon from '../../../assets/icons/eye-opened';
import EyeClosedIcon from '../../../assets/icons/eye-closed';
import { Paddings } from '../../tokens/size';

type TInput = 'password' | 'text';

type Props = TextInputProps & {
    type?: TInput;
    label?: string;
};

export const Input = ({ type = 'text', label, ...props }: Props) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isVisisble, setIsVisible] = useState<boolean>(false);

    const toggleVisible = () => {
        setIsVisible(prev => !prev);
    };

    const onFocus = () => {
        setIsFocus(true);
    };

    const onBlur = () => {
        setIsFocus(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inner}>
                <TextInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholderTextColor={Colors.primaryPlaceholderText}
                    style={[styles.input, isFocus && styles.focused]}
                    secureTextEntry={type === 'password' && !isVisisble}
                    caretHidden
                    {...props}
                />
                {type === 'password' && (
                    <Pressable style={styles.eyeIcon} onPress={toggleVisible}>
                        {!isVisisble ? <EyeOpenedIcon /> : <EyeClosedIcon />}
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: Colors.primaryLabel,
        marginBottom: 4,
    },
    inner: {
        flexDirection: 'column',
        position: 'relative',
    },
    container: {
        flexDirection: 'column',
        position: 'relative',
    },
    input: {
        height: 50,
        paddingHorizontal: Paddings.inlineX1,
        paddingVertical: Paddings.blockX1,
        width: 290,
        backgroundColor: Colors.primaryContainer,
        color: Colors.primaryLabel,
        borderRadius: 8,
    },
    eyeIcon: {
        right: Paddings.inlineX1,
        top: 0,
        transform: [{ translateY: '50%' }],
        position: 'absolute',
    },
    focused: {
        borderColor: Colors.accentFirst,
        borderWidth: 2,
    },
});
