import { getCrops, getDBConnection } from '@/app/services/db-service';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Crops() {
    const [loading, setLoading] = useState(true);
    const [ crops, setCrops ] = useState([]);
  
    useEffect(() => {
      const loadCrops = async () => {
        const db = await getDBConnection();
        const cropsResult = await getCrops(db);

        console.log(cropsResult);

        setLoading(false);

        return cropsResult;
      };
  
      setCrops(loadCrops());
    }, []);


   if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Crop list</Text>
          <Text>{JSON.stringify(crops)}</Text>
        </View>
      );
    }
}
