import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../components/layout/useTheme';

import { useNavigation } from '@react-navigation/native';


export function Home() {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://stud.hosted.hr.nl/0960572/PRG07/eindopdracht.json');
        const jsonData = await response.json();
        setData(jsonData.clubs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: theme === 'dark' ? 'black' : 'white'}}>
      {data.length > 0 ? (
        <View>
          {data.map((club, index) => (
            <Pressable
  key={index}
  style={{ marginBottom: 10 }}
  onPress={() => navigation.navigate('Maps', { club })}
>
  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name: {club.name}</Text>
  <Text style={{ fontSize: 16 }}>Genre: {club.genre}</Text>
</Pressable>

          ))}
        </View>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
}
