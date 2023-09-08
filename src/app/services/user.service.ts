import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  logGoogle() {
    return GoogleAuth.signIn();
  }

  private capitalizarNombres(nombreCompleto: string): string {
    const nombres: string[] = nombreCompleto.split(' ');
    const nombresCapitalizados: string[] = nombres.map((nombre) => {
      return (
        nombre.charAt(0).toLocaleUpperCase() +
        nombre.slice(1).toLocaleLowerCase()
      );
    });

    return nombresCapitalizados.join(' ');
  }

  async almacenarDatosLocalStorage(datos: any) {
    let datosUsuario = {
      nombre_completo: this.capitalizarNombres(datos.name || datos.displayName),
      correo: datos.email,
      rol:
        datos.id == 'HgcGxvwAz8elfbD6dMf10mppYm52'
          ? 'Administrador'
          : 'Usuario',
      uid: datos.id,
      url_foto: datos.imageUrl,
    };

    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    await this.agregarUsuarioSiNoExiste(
      datosUsuario.uid,
      datosUsuario.nombre_completo,
      datosUsuario.url_foto
    );
  }

  obtenerDatosLocalStorage() {
    const datosUsuario: string | null = localStorage.getItem('datosUsuario');

    if (datosUsuario) {
      return JSON.parse(datosUsuario);
    }
  }

  eliminarDatosLocalStorage() {
    localStorage.removeItem('datosUsuario');
  }

  private async verificarExistenciaUsuario(uidUsuario: string) {
    const collectionRef = collection(this.firestore, 'usuarios');
    const consulta = query(
      collectionRef,
      where('uid_usuario', '==', uidUsuario)
    );

    const documentos: QuerySnapshot = await getDocs(consulta);

    return !documentos.empty;
  }

  async agregarUsuarioSiNoExiste(
    idUsuario: string,
    nombreUsuario: string,
    fotoUsuario: string
  ) {
    const usuarioExiste = await this.verificarExistenciaUsuario(idUsuario);

    if (!usuarioExiste) {
      let datos = {
        uid_usuario: idUsuario,
        nombre: nombreUsuario,
        foto: fotoUsuario,
      };

      await addDoc(collection(this.firestore, 'usuarios'), datos);
    }
  }

  async recuperarUsuarios() {
    const uidUsuarioActual = this.obtenerDatosLocalStorage()['uid'];

    const collectionRef = collection(this.firestore, 'usuarios');
    const consulta = query(
      collectionRef,
      where('uid_usuario', '!=', uidUsuarioActual)
    );

    const documentos: QuerySnapshot = await getDocs(consulta);
    if (documentos.empty) return [];

    const promesas = documentos.docs.map(async (doc) => {
      return {
        ...doc.data(),
      };
    });

    return await Promise.all(promesas);
  }

  async bloquearUsuario(idUsuario: string) {
    const collectionRef = collection(this.firestore, 'usuarios');
    const consulta = query(
      collectionRef,
      where('uid_usuario', '==', idUsuario)
    );

    const querySnapshot = await getDocs(consulta);
    const idDocumento = querySnapshot.docs[0].id;

    await updateDoc(doc(this.firestore, 'usuarios', idDocumento), {
      ['estado']: 'Bloqueado',
    });
  }
}
