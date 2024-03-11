import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Text } from "./Themed";

export interface IButtonProps extends TouchableOpacityProps {
    title: string;
    backgroundColor?: string;
}

export default function Button(props: IButtonProps) {
    const { onPress, backgroundColor = "#129dd4", title = 'Save' } = props;
    return (
        <TouchableOpacity {...props} style={[styles.button, { backgroundColor: props.disabled ? "gray" : backgroundColor }]} onPress={onPress}>
            <Text style={styles.text} tw="text-base" familyType="Bold">{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        lineHeight: 18,
        letterSpacing: 0.25,
        color: 'white',
    },
});