import React from 'react'
import { styled } from 'nativewind';
import { ScrollView, TouchableOpacity } from 'react-native';

import Button from '@/components/button';
import { setupDatabase } from '@/lib/db';
import { Text, View } from '@/components/themed';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface IItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

const TouchableOpacityStyled = styled(TouchableOpacity);

const ItemCard = ({ item, onDelete, onUpdate }: IItemCardProps) => {
  return (
    <View tw="bg-gray-200 p-4 my-2 rounded">
      <Text tw="text-lg font-bold">{item.name}</Text>
      <Text tw="text-sm mb-2">{item.description}</Text>
      <View tw="flex flex-row bg-transparent">
        <TouchableOpacityStyled
          tw="bg-blue-500 px-4 py-2 rounded mr-2"
          onPress={() => onUpdate(item.id)}
        >
          <Text tw="text-white font-bold">Actualizar</Text>
        </TouchableOpacityStyled>
        <TouchableOpacityStyled
          tw="bg-red-500 px-4 py-2 rounded"
          onPress={() => onDelete(item.id)}
        >
          <Text tw="text-white font-bold">Borrar</Text>
        </TouchableOpacityStyled>
      </View>
    </View>
  );
};

const db = setupDatabase();

export default function ToolsScreen() {
  const [items, setItems] = React.useState<Item[]>([])
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT
        );`
      );

      tx.executeSql(
        'SELECT * FROM items',
        [],
        (_, { rows }) => setItems(rows._array),
      );
    });
  }, [forceUpdateId]);

  const addItem = (name: string, description: string) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (name, description) VALUES (?, ?)',
        [name, description],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log('Item added with ID:', insertId);
          } else {
            console.error('Failed to add item.');
          }
        },
      );
    }, undefined, forceUpdate);
  };

  const updateItem = (id: number, name: string, description: string) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE items SET name=?, description=? WHERE id=?',
        [name, description, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Item updated successfully.');
          } else {
            console.error('Failed to update item.');
          }
        },
      );
    }, undefined, forceUpdate);
  };

  const deleteItem = (id: number) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE id=?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Item deleted successfully.');
          } else {
            console.error('Failed to delete item.');
          }
        },
      );
    }, undefined, forceUpdate);
  };

  return (
    <View tw="container p-3 flex-1">
      <Text tw="text-xl mb-6" familyType="Bold">Lista de articulos</Text>
      <ScrollView key={`ScrollView-${forceUpdateId}`}>
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={(id) => {
              try {
                deleteItem(id);
              } catch (error) {
                console.error('Error deleting item:', error);
              }
            }}
            onUpdate={(id) => {
              try {
                updateItem(id, 'Updated Item', 'This item has been updated.');
              } catch (error) {
                console.error('Error updating item:', error);
              }
            }}
          />
        ))}
      </ScrollView>
      <Button title="Add Item" onPress={async () => {
        try {
          addItem('New Item', 'This is a new item.');
        } catch (error) {
          console.error('Error adding item:', error);
        }
      }} />
    </View>
  );
}

function useForceUpdate(): [() => void, number] {
  const [value, setValue] = React.useState(0);
  return [() => setValue(value + 1), value];
}