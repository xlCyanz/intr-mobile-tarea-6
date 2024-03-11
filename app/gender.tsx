import React from 'react';
import { styled } from 'nativewind';
import { TextInput } from 'react-native';

import Button from '@/components/Button';
import { Text, View, useThemeColor } from '@/components/Themed';

const StyledTextInput = styled(TextInput);

const GENDER_API = "https://api.genderize.io/?name=";

interface IResult {
    name: string;
    count: number;
    probability: number;
    gender: "male" | "female";
}

const GenderScreen = () => {
    const maleColor = useThemeColor({}, "male");
    const femaleColor = useThemeColor({}, "female");

    const [data, setData] = React.useState<IResult>();
    const [text, setText] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${GENDER_API}${text}`);
            const data = await res.json();
            setData(data);
        } finally {
            return setLoading(false);
        }
    }

    const cleanResult = () => {
        setData(undefined);
        setText("");
        setLoading(false)
    }

    const backgroundColor = React.useMemo(() => {
        if (data?.gender === "male") return maleColor;
        if (data?.gender === "female") return femaleColor;
        return undefined;
    }, [data])

    return (
        <View tw="container p-3 flex-1" style={backgroundColor ? { backgroundColor } : undefined}>
            <Text tw="mb-1" familyType="Medium">Ingresa tu nombre</Text>
            <StyledTextInput
                tw="px-2 h-10 border-gray-400 bg-gray-100 border rounded-md mb-4"
                onChangeText={(text) => {
                    if (!text) setData(undefined);
                    setText(text);
                }}
                placeholder="Ej: Manuela"
                value={text}
            />
            <Button title="Predecir" onPress={handleSubmit} disabled={!text} />
            <View tw="my-1" />
            {!!data && <Button title="Limpiar" backgroundColor="red" onPress={cleanResult} />}
            <Text tw="text-md" familyType="Regular" style={{ display: loading ? "flex" : "none" }}>Cargando...</Text>
            <View tw="bg-transparent" style={{ display: data && !loading ? "flex" : "none" }}>
                <Text tw="text-2xl my-3" familyType="Bold">Resultado</Text>
                <Text tw="text-lg">El nombre {data?.name} es {((data?.probability ?? 0) * 100).toFixed(2)}% {data?.gender === "male" ? "hombre" : "mujer"}.</Text>
            </View>
        </View>
    )
};

export default GenderScreen;