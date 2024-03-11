import { Image } from 'expo-image';
import { styled } from 'nativewind';

import { Text, View } from '@/components/Themed';

const StyledImage = styled(Image);

export default function ContactScreen() {
    return (
        <View tw="container flex-1 justify-center items-center p-3">
            <StyledImage tw="h-48 w-48 rounded-lg mb-3" source={require("../../assets/images/contact-image.jpg")} />
            <Text tw="text-3xl mb-3 text-center" familyType="Bold">Johan Ezequiel Sierra Linares</Text>
            <Text tw="text-lg mb-3" familyType="Regular">johanse.linares@gmail.com</Text>
            <Text tw="text-lg mb-2" familyType="Regular">+1 (829) 835-1427</Text>
        </View>
    );
}
