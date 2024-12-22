import { StyleSheet, Text, TextProps } from 'react-native';
import { ReactElement } from 'react';
import { Colors } from '@/shared/tokens/colors';

interface IProps extends TextProps {
    variant: 'title' | 'p';
}

export const Typography = ({ children, variant }: IProps) => {
    return <Text style={styles[variant]}>{children}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 600,
        fontSize: 24,
        color: Colors.primaryButtonText,
    },

    p: {
        fontWeight: 500,
        fontSize: 16,
        color: Colors.primaryButtonText,
    },
});
