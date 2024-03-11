import React from 'react';
import { styled } from 'nativewind';
import { FlatList, Linking, TextInput, TouchableOpacity } from 'react-native';

import Button from '@/components/Button';
import { Text, View, useThemeColor } from '@/components/Themed';
import { ExternalLink } from '@/components/ExternalLink';

const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const API = "http://universities.hipolabs.com/search?country=";

interface IResult {
    name: string;
    count: number;
    country: string;
    domains: string[];
    "web_pages": string;
    "alpha_two_code": string;
    "state-province": string;
}

const UniversityScreen = () => {
    const [text, setText] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<IResult[]>([]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}${text}`);
            const data = await res.json();
            setData(data);
        } finally {
            return setLoading(false);
        }
    }

    const cleanResult = () => {
        setData([]);
        setText("");
        setLoading(false)
    }

    return (
        <View tw="container p-3 flex-1">
            <Text tw="mb-1" familyType="Medium">Ingresa el nombre de la universidad (en ingles)</Text>
            <StyledTextInput
                value={text}
                onChangeText={setText}
                placeholder="Ex: Dominican Republic"
                tw="px-2 h-10 border-gray-400 bg-gray-100 border rounded-md mb-4"
            />
            <Button title="En listar" onPress={handleSubmit} disabled={!text} />
            <View tw="my-1" />
            {!!data.length && <Button title="Limpiar" backgroundColor="red" onPress={cleanResult} />}
            <Text tw="text-md" familyType="Regular" style={{ display: loading ? "flex" : "none" }}>Cargando...</Text>
            <View tw="flex-1 bg-transparent" style={{ display: data.length && !loading ? "flex" : "none" }}>
                <Text tw="text-2xl my-3" familyType="Bold">Resultados</Text>
                <FlatList
                    data={data}
                    initialNumToRender={7}
                    renderItem={({ item }) => {
                        return (
                            <StyledTouchableOpacity tw="py-2" onPress={() => {
                                const url = item.domains[0];
                                return Linking.canOpenURL(url).then(() => {
                                    Linking.openURL(url);
                                });
                            }}>
                                <Text tw="text-md" familyType="Medium">{item.name}</Text>
                                <Text tw="text-md text-blue-500" familyType="Medium">Ir al sitio web</Text>
                            </StyledTouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
};

export default UniversityScreen;