import { View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@react-navigation/elements';
import { Colors } from '@/shared/tokens/colors';
import { Bookmark } from '../../../assets/icons/bookmark';
import { Home } from '../../../assets/icons/home';
import { List } from '../../../assets/icons/list';
import { SvgProps } from 'react-native-svg';

const ICONS = {
    favorites: (props: SvgProps) => <Bookmark {...props} />,
    index: (props: SvgProps) => <Home {...props} />,
    library: (props: SvgProps) => <List {...props} />,
};

// @ts-ignore
export function TabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.toolbar}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                /*@ts-ignore*/
                const Icon = ICONS?.[route.name];

                return (
                    <TouchableOpacity
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            boxShadow: isFocused
                                ? `0px -2px 30px -8px ${Colors.primarySpecial}`
                                : 'none',
                            backgroundColor: isFocused
                                ? Colors.primarySpecial
                                : 'transparent',
                            ...styles.item,
                        }}
                    >
                        {/*<Icon stroke={isFocused ? Colors.primary : 'white'} />*/}
                        {/*@ts-ignore*/}
                        {ICONS?.[route.name] && (
                            <Icon
                                stroke={isFocused ? Colors.primary : 'white'}
                            />
                        )}
                        <Text
                            key={index}
                            style={{
                                fontWeight: 600,
                                fontSize: 14,
                                alignSelf: 'center',
                                color: !isFocused
                                    ? Colors.primaryButtonText
                                    : Colors.primary,
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 5,
        borderRadius: 14,
        gap: 4,
        alignItems: 'center',
    },
    toolbar: {
        padding: 6,
        overflow: 'hidden',
        flexDirection: 'row',
        borderRadius: 16,

        backgroundColor: Colors.primaryContainer,
        margin: 10,
    },
});
