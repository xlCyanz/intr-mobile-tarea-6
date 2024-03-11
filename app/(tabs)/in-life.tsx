import { ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { View } from '@/components/Themed';

export default function InLifeScreen() {
    return (
        <View tw="container p-3 bg-transparent">
            <YoutubePlayer
                height={300}
                videoId="K6BonUut_mc"
            />
        </View>
    );
}
