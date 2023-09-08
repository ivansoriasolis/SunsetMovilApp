import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  constructor(private firestore: Firestore) {}

  async recuperarReportes() {
    const collectionRef = collection(this.firestore, 'reportes');
    const consulta = query(collectionRef);

    const documentos: QuerySnapshot = await getDocs(consulta);
    if (documentos.empty) return [];

    const promesas = documentos.docs.map(async (doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    return await Promise.all(promesas);
  }

  async eliminarReporte(idReporte: string) {
    await deleteDoc(doc(this.firestore, 'reportes', idReporte));
  }
}
