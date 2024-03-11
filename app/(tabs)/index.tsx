import { router } from 'expo-router';

import { Text, View } from '@/components/Themed';
import Button from '@/components/Button';

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
      {tools.map((tool) => (
        <View key={tool.title} tw="mb-6">
          <Button title={tool.title} onPress={tool.onPress} backgroundColor="#129dd4" />
          <Text tw="text-md" familyType="Regular">{tool.subtitle}</Text>
        </View>
      ))}
    </View>
  );
}