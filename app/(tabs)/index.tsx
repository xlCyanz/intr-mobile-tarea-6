import { router } from 'expo-router';

import { Text, View } from '@/components/themed';
import Button from '@/components/button';
import { ScrollView } from 'react-native';

interface ITools {
  title: string;
  subtitle: string;
  onPress: () => void;
}

export default function ToolsScreen() {
  const tools: ITools[] = [
    {
      title: "Predicción de genero",
      subtitle: "Predice el genero dependiendo el nombre.",
      onPress: () => router.navigate("/gender"),
    },
    {
      title: "Predicción de edad",
      subtitle: "Predice la edad dependiendo el nombre.",
      onPress: () => router.navigate("/age"),
    },
    {
      title: "Universidades por país",
      subtitle: "En lista las universidades dependiendo el país.",
      onPress: () => router.navigate("/university"),
    }
  ]

  return (
    <View tw="container p-3 flex-1">
      <Text tw="text-xl mb-6" familyType="Bold">Lista de opciones</Text>
      <ScrollView>
        {tools.map((tool) => (
          <View key={tool.title} tw="mb-6">
            <Button title={tool.title} onPress={tool.onPress} />
            <Text tw="text-md" familyType="Regular">{tool.subtitle}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}