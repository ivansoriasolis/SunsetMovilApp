import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {
  QuerySnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ToastService } from './toast.service';
import { deleteObject } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  public uidUsuarioVerPublicaciones = '';
  coleccion = 'publicaciones';
  public urlFotoTomada!: string;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private toastService: ToastService
  ) {}

  async subirPublicacionFirestore(datos: object) {
    await addDoc(collection(this.firestore, this.coleccion), datos);
  }

  async subirImagenFirestorage(imagen: string) {
    const ruta = `imagenes_publicaciones/${new Date().getTime()}.jpg`;
    const referencia = ref(this.storage, ruta);

    fetch(imagen)
      .then((respuesta) => respuesta.blob())
      .then((imagenEnBlob) => {
        uploadBytes(referencia, imagenEnBlob).catch((error) => {
          this.toastService.mostrarToast(
            'Ocurrió un error inesperado',
            3000,
            'top'
          );
        });
      })
      .catch(() => {
        this.toastService.mostrarToast(
          'Ocurrió un error inesperado',
          3000,
          'top'
        );
      });

    return ruta;
  }

  async eliminarImagenFirestorage(rutaImagen: string) {
    await deleteObject(ref(this.storage, rutaImagen));
  }

  async obtenerUrlPublicaImagen(rutaFirestorage: string) {
    const referencia = ref(this.storage, rutaFirestorage);

    try {
      const url = await getDownloadURL(referencia);
      return url;
    } catch (error) {
      this.toastService.mostrarToast(
        'Ocurrió un error inesperado',
        3000,
        'top'
      );

      return;
    }
  }

  obtenerTiempoTranscurrido(fechaEnSegundos: number) {
    const fecha = new Date(0);
    fecha.setSeconds(fechaEnSegundos);

    const segundosTranscurridos = Math.floor(
      (Date.now() - fecha.getTime()) / 1000
    );

    let tiempo;

    if (segundosTranscurridos < 60) {
      tiempo = `${segundosTranscurridos} segundo${
        segundosTranscurridos !== 1 ? 's' : ''
      }`;
    } else if (segundosTranscurridos < 3600) {
      const minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
      tiempo = `${minutosTranscurridos} minuto${
        minutosTranscurridos !== 1 ? 's' : ''
      }`;
    } else if (segundosTranscurridos < 86400) {
      const horasTranscurridas = Math.floor(segundosTranscurridos / 3600);
      tiempo = `${horasTranscurridas} hora${
        horasTranscurridas !== 1 ? 's' : ''
      }`;
    } else if (segundosTranscurridos < 2592000) {
      const diasTranscurridos = Math.floor(segundosTranscurridos / 86400);
      tiempo = `${diasTranscurridos} día${diasTranscurridos !== 1 ? 's' : ''}`;
    } else if (segundosTranscurridos < 31536000) {
      const mesesTranscurridos = Math.floor(segundosTranscurridos / 2592000);
      tiempo = `${mesesTranscurridos} mes${
        mesesTranscurridos !== 1 ? 'es' : ''
      }`;
    } else {
      const añosTranscurridos = Math.floor(segundosTranscurridos / 31536000);
      tiempo = `${añosTranscurridos} año${añosTranscurridos !== 1 ? 's' : ''}`;
    }

    return tiempo;
  }

  async obtenerPublicaciones() {
    try {
      const collectionRef = collection(this.firestore, 'publicaciones');
      const consulta = query(collectionRef, orderBy('fecha', 'desc'));
      const documentos: QuerySnapshot = await getDocs(consulta);

      if (documentos.empty) return [];

      const promesas = documentos.docs.map(async (doc) => {
        const imagenUrl = await this.obtenerUrlPublicaImagen(
          doc.data()['imagen']
        );

        return {
          ...doc.data(),
          id: doc.id,
          imagen: imagenUrl,
          fecha: this.obtenerTiempoTranscurrido(doc.data()['fecha'].seconds),
        };
      });

      const publicacionesConFormato = await Promise.all(promesas);
      return publicacionesConFormato;
    } catch (error) {
      this.toastService.mostrarToast(
        'Ocurrió un error inesperado',
        3000,
        'top'
      );

      throw error;
    }
  }

  async obtenerPublicacionesPersonales(uidUsuario: string) {
    try {
      const collectionRef = collection(this.firestore, 'publicaciones');
      const consulta = query(
        collectionRef,
        where('uid_autor', '==', uidUsuario),
        orderBy('fecha', 'desc')
      );
      const documentos: QuerySnapshot = await getDocs(consulta);

      if (documentos.empty) return [];

      const promesas = documentos.docs.map(async (doc) => {
        const imagenUrl = await this.obtenerUrlPublicaImagen(
          doc.data()['imagen']
        );

        return {
          ...doc.data(),
          id: doc.id,
          imagen: imagenUrl,
          fecha: this.obtenerTiempoTranscurrido(doc.data()['fecha'].seconds),
        };
      });

      const publicacionesConFormato = await Promise.all(promesas);
      return publicacionesConFormato;
    } catch (error) {
      this.toastService.mostrarToast(
        'Ocurrió un error inesperado',
        3000,
        'top'
      );

      throw error;
    }
  }

  async obtenerRutaImgFirestorage(idPublicacion: string) {
    try {
      const collectionRef = collection(this.firestore, 'publicaciones');
      const documentoRef = doc(collectionRef, idPublicacion);

      const documento = (await getDoc(documentoRef)).data();
      const rutaImgFirestorage = documento!['imagen'];

      return rutaImgFirestorage;
    } catch (error) {
      this.toastService.mostrarToast(
        'Ocurrió un error inesperado',
        3000,
        'top'
      );

      throw error;
    }
  }

  async obtenerPublicacionesConMeEncanta(uidUsuario: string) {
    const collectionRef = collection(this.firestore, 'me_encanta');
    const consulta = query(
      collectionRef,
      where('autor_me_encanta', '==', uidUsuario)
    );

    const documentos: QuerySnapshot = await getDocs(consulta);
    if (documentos.empty) return [];

    let arrayConPublicaciones: any[] = [];

    documentos.docs.map(async (doc) => {
      arrayConPublicaciones.push(doc.data()['id_publicacion']);
    });

    return arrayConPublicaciones;
  }

  async eliminarPublicacion(idPublicacion: string) {
    await deleteDoc(doc(this.firestore, 'publicaciones', idPublicacion));

    // Borrar me encanta ligados
    let meEncantaRef = collection(this.firestore, 'me_encanta');
    let consulta = query(
      meEncantaRef,
      where('id_publicacion', '==', idPublicacion)
    );

    let querySnapshot = await getDocs(consulta);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    // Borrar comentarios ligados

    let comentariosRef = collection(this.firestore, 'comentarios');
    consulta = query(
      comentariosRef,
      where('id_publicacion', '==', idPublicacion)
    );

    querySnapshot = await getDocs(consulta);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  async reportarPublicacion(datos: object) {
    await addDoc(collection(this.firestore, 'reportes'), datos);
  }

  async agregarMeEncanta(datos: object, idPublicacion: string) {
    await addDoc(collection(this.firestore, 'me_encanta'), datos);
    await updateDoc(doc(this.firestore, 'publicaciones', idPublicacion), {
      ['me_encanta']: increment(1),
    });
  }

  async quitarMeEncanta(idPublicacion: string, autor: string) {
    const collectionRef = collection(this.firestore, 'me_encanta');
    const consulta = query(
      collectionRef,
      where('autor_me_encanta', '==', autor),
      where('id_publicacion', '==', idPublicacion)
    );

    const querySnapshot = await getDocs(consulta);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    await updateDoc(doc(this.firestore, 'publicaciones', idPublicacion), {
      ['me_encanta']: increment(-1),
    });
  }

  async recuperarComentariosPublicacion(idPublicacion: string) {
    const collectionRef = collection(this.firestore, 'comentarios');
    const consulta = query(
      collectionRef,
      where('id_publicacion', '==', idPublicacion),
      orderBy('fecha_comentario', 'desc')
    );

    const documentos: QuerySnapshot = await getDocs(consulta);
    if (documentos.empty) return [];

    const arrayConComentarios = documentos.docs.map(async (doc) => {
      return {
        ...doc.data(),
        fecha_comentario: this.obtenerTiempoTranscurrido(
          doc.data()['fecha_comentario'].seconds
        ),
      };
    });

    return await Promise.all(arrayConComentarios);
  }

  async agregarComentario(datos: object) {
    await addDoc(collection(this.firestore, 'comentarios'), datos);
  }
}
