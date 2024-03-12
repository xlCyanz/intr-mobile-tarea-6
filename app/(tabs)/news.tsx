import React from 'react';
import { styled } from 'nativewind';
import { Alert, Linking, ScrollView, TextInput } from 'react-native';

import { Text, View } from '@/components/themed';
import NewsCard from '@/components/news-card';

const API = "https://elnuevodiario.com.do/wp-json/wp/v2/posts?per_page=3";

interface IResult {
    id: number;
    title: string;
    link: string;
    fimg_url: string;
    excerpt_plaintext: string;
}

const ScrollViewStyled = styled(ScrollView);

const GenderScreen = () => {
    const [data, setData] = React.useState<IResult[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fn = async () => {
            setLoading(true);
            try {
                const res = await fetch(API);
                const result = await res.json();
                setData(result);
            } finally {
                setLoading(false);
            }
        }

        fn();
    }, [])

    return (
        <View tw="container flex-1">
            <Text tw="text-md p-3" familyType="Regular" style={{ display: loading ? "flex" : "none" }}>Cargando...</Text>
            <ScrollViewStyled tw="p-3" style={{ display: !loading ? "flex" : "none" }}>
                {data.map((value) => (
                    <NewsCard
                        key={value.id}
                        title={value.title}
                        imageSource={value.fimg_url}
                        description={value.excerpt_plaintext}
                        onPress={async () => {
                            const url = value.link;
                            const supported = await Linking.canOpenURL(url);

                            if (supported) {
                                await Linking.openURL(url);
                            } else {
                                Alert.alert(`No es posible abrir este enlace: ${url}`);
                            }
                        }}
                    />
                ))}
            </ScrollViewStyled>
        </View>
    )
};

export default GenderScreen;