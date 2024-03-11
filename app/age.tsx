import React from 'react';
import { Image } from 'expo-image';
import { styled } from 'nativewind';
import { TextInput } from 'react-native';

import Button from '@/components/Button';
import { Text, View, useThemeColor } from '@/components/Themed';

const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const AGE_API = "https://api.agify.io/?name=";

interface IResult {
    age: number;
    name: string;
    count: number;
}

const AgeScreen = () => {
    const [data, setData] = React.useState<IResult>();
    const [text, setText] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${AGE_API}${text}`);
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

    const ageName = React.useMemo(() => {
        const mapping = {
            "baby": require(`../assets/images/male/baby.png`),
            "kid": require(`../assets/images/male/kid.png`),
            "young": require(`../assets/images/male/young.png`),
            "adult": require(`../assets/images/male/adult.png`),
            "old": require(`../assets/images/male/old.png`),
        };

        const age = data?.age ?? 0;

        if (age < 1) return mapping["baby"]
        else if (age >= 1 && age <= 13) return mapping["kid"];
        else if (age >= 13 && age <= 18) return mapping["young"]
        else if (age >= 18 && age <= 65) return mapping["adult"];
        else return mapping["old"];

    }, [data?.age])

    return (
        <View tw="container p-3 flex-1">
            <Text tw="mb-1" familyType="Medium">Ingresa tu nombre</Text>
            <StyledTextInput
                value={text}
                placeholder="Ej: 30"
                onChangeText={(text) => {
                    if (!text) setData(undefined);
                    setText(text);
                }}
                tw="px-2 h-10 border-gray-400 bg-gray-100 border rounded-md mb-4"
            />
            <Button title="Predecir" onPress={handleSubmit} disabled={!text} />
            <View tw="my-1" />
            {!!data && <Button title="Limpiar" backgroundColor="red" onPress={cleanResult} />}
            <Text tw="text-md" familyType="Regular" style={{ display: loading ? "flex" : "none" }}>Cargando...</Text>
            <View tw="bg-transparent" style={{ display: data && !loading ? "flex" : "none" }}>
                <Text tw="text-2xl my-3" familyType="Bold">Resultado</Text>
                <Text tw="text-lg">El nombre {data?.name} tiene {(data?.age ?? 0)} año(s).</Text>
                <StyledImage source={ageName} tw="rounded-lg mt-3 h-20 w-20" />
            </View>
        </View>
    )
};

export default AgeScreen;