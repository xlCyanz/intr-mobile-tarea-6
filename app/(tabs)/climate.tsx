import WebView from 'react-native-webview';

export default function ClimateScreen() {
    return (
        <WebView source={{ uri: "https://www.meteored.do/" }} />
    );
}
