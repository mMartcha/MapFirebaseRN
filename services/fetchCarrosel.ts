import { MapContext } from '@/context/MapContext';
import { getFirestore } from '@react-native-firebase/firestore';
import { useContext } from 'react';

const {setCarroselUm, setCarroselDois} = useContext(MapContext)

export async function fetchCarrosel1() {
    const querySnapshot = await getFirestore().collection('testeCarrosel').get();
    const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || '',
        data: doc.data().data || '',
        tempo: doc.data().tempo || '',
    }
  )
)
setCarroselUm(data)
}

export async function fetchCarrosel2() {
    const querySnapshot = await getFirestore().collection('testeCarroselDois').get();
    const data =  querySnapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome || '',
        data: doc.data().data || '',
        valor: doc.data().valor || '',
    }
  )
)
setCarroselDois(data)
    
}

