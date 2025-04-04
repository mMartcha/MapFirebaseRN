import { getFirestore } from '@react-native-firebase/firestore';

export async function getCarroselImages1(setCarroselUmImages: (images: string[]) => void) {
    try {
        const querySnapshot = await getFirestore().collection('testeCarrosel').get();
        const fetchedImages = querySnapshot.docs.map(element => {
            const data = element.data();
            console.log(data.imagem); // Acessa a propriedade 'imagem'
            return data.imagem; // Retorna a propriedade 'imagem'
        });
        setCarroselUmImages(fetchedImages); // Atualiza o estado com as imagens
    } catch (error) {
        console.error('Erro ao buscar pontos:', error);
    }
}


export async function getCarroselImages2(setCarroselDoisImages: (images: string[]) => void) {
    try {
        const querySnapshot = await getFirestore().collection('testeCarroselDois').get();
        const fetchedImages = querySnapshot.docs.map(element => {
            const data = element.data();
            console.log(data.imagem); // Acessa a propriedade 'imagem'
            return data.imagem; // Retorna a propriedade 'imagem'
        });
        setCarroselDoisImages(fetchedImages); // Atualiza o estado com as imagens
    } catch (error) {
        console.error('Erro ao buscar pontos:', error);
    }
}