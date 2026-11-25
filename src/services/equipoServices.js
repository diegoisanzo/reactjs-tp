import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const COLECCION_EQUIPO = 'Equipo';
const equipoDB = collection(db, COLECCION_EQUIPO);

export const readEquipo = async () => {
    const resp = await getDocs(equipoDB);
    return resp.docs.map((documento) => ({
        ...documento.data(),
        id: documento.id,
    }));
};
