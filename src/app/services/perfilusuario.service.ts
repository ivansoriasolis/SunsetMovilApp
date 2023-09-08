import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PerfilusuarioService {
  public uidUsuarioVerPerfil = '';
  public urlFotoUsuarioVerPerfil = '';
  public nombreUsuarioVerPerfil = '';

  constructor(private firestore: Firestore) {}

  async verificarSiEsSeguidor(uid_seguidor: string, uid_seguido: string) {
    const collectionRef = collection(this.firestore, 'seguidores');
    const consulta = query(
      collectionRef,
      where('uid_seguidor', '==', uid_seguidor),
      where('uid_seguido', '==', uid_seguido)
    );

    const documentos: QuerySnapshot = await getDocs(consulta);

    return !documentos.empty;
  }

  async seguirUsuario(datos: object) {
    await addDoc(collection(this.firestore, 'seguidores'), datos);
  }

  async dejarSeguirUsuario(uid_seguidor: string, uid_seguido: string) {
    const collectionRef = collection(this.firestore, 'seguidores');
    const consulta = query(
      collectionRef,
      where('uid_seguidor', '==', uid_seguidor),
      where('uid_seguido', '==', uid_seguido)
    );

    const querySnapshot = await getDocs(consulta);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  async recuperarCantidadSeguidores(uid_seguido: string) {
    const collectionRef = collection(this.firestore, 'seguidores');
    const consulta = query(
      collectionRef,
      where('uid_seguido', '==', uid_seguido)
    );

    const documentos: QuerySnapshot = await getDocs(consulta);

    return documentos.size;
  }

  async recuperarCantidadSeguidos(uid_seguidor: string) {
    const collectionRef = collection(this.firestore, 'seguidores');
    const consulta = query(
      collectionRef,
      where('uid_seguidor', '==', uid_seguidor)
    );

    const documentos: QuerySnapshot = await getDocs(consulta);

    return documentos.size;
  }

  async recuperarCantidadPublicaciones(uid_autor: string) {
    const collectionRef = collection(this.firestore, 'publicaciones');
    const consulta = query(collectionRef, where('uid_autor', '==', uid_autor));

    const documentos: QuerySnapshot = await getDocs(consulta);

    return documentos.size;
  }
}
