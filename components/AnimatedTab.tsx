import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, Dimensions, Platform } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedState } from '@/context/SharedContext';

const AnimatedTab = ({ state, descriptors, navigation, insets }: BottomTabBarProps) => {
    const { scrollY } = useSharedState();
    const bottom = useSafeAreaInsets();
    const screenWidth = Dimensions.get("screen").width;
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY:
                        scrollY.value === 1
                            ? withTiming(100, { duration: 300 })
                            : withTiming(0, { duration: 300 }),
                },
            ],
        };
    });

    const indicatorStyle = useAnimatedStyle(() => {
        const baseLeft = 8;
        let slideValue = 0.4;

        return {
            left: withTiming(baseLeft + state?.index * screenWidth * slideValue,{duration:500}),
            
        }
    })



    return (
        <Animated.View style={[animatedStyle, styles.tabBarContainer, {
            paddingBottom: bottom.bottom,
            justifyContent: "center",

        }]}>

            <View style={styles.tabContainer}>
            <Animated.View
                    style={[
                        styles.slidingIndicator,
                        indicatorStyle,

                    ]}
                />
                {state?.routes?.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options?.tabBarLabel !== undefined ? options?.tabBarLabel : options.title !== undefined ? options?.title : route.name;

                    const isFocused = state.index == index;
                    const onPress = (event: GestureResponderEvent) => {
                        const eventResult = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true
                        });
                        if (!isFocused && !eventResult.defaultPrevented) {
                            navigation.navigate(route.name)
                        }

                    }
                    const onLongPress = () => {
                        navigation.emit({ type: "tabLongPress", target: route.key });
                    };


                    return (
                        <TouchableOpacity accessibilityRole='button' key={index} accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarButtonTestID} onPress={onPress} onLongPress={onLongPress} style={styles.tab}>
                            <Text style={{ fontSize: 18, color: isFocused ? "#33b6ff" : 'black' ,fontWeight:"bold"}}>{label?.toString()?.toUpperCase()}</Text>
                        </TouchableOpacity>
                    )
                })}
                <View style={styles.verticalLine} />
               
            </View>


        </Animated.View>
    )
}

export default AnimatedTab

const styles = StyleSheet.create({
    tabBarContainer: {
        width: "100%",
        position: "absolute",
        height: Platform.OS == "android" ? 60:100,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        elevation: 5,
        shadowRadius: 11,
        shadowColor: "#000",
        bottom: 0,
        zIndex: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",



    },
    slidingIndicator: {
        position: "absolute",
        height: "80%",
        borderRadius: 20,
        width: "45%",
        backgroundColor: "#fff",
        elevation:4


    },
    tabContainer: {
        width: Dimensions.get("window").width * 0.80,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#D3D3D3",
        height: "85%",
        borderRadius: 40

    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
    },
    verticalLine: {
        marginHorizontal: 10,
        height: "90%",
        width: 2,
        position: "absolute",
        left: "47%",
        borderRadius: 20,
        opacity: 0.2,
        backgroundColor: "#B4B4B4", // Using default color
        zIndex:0
    },
});