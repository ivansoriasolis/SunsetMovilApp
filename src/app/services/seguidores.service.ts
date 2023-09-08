import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class SeguidoresService {
  public uidUsuarioSeguidores = '';

  constructor(private firestore: Firestore) {}

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

  async obtenerSeguidoresUsuario() {
    const collectionRef = collection(this.firestore, 'seguidores');
    const consulta = query(
      collectionRef,
      where('uid_seguido', '==', this.uidUsuarioSeguidores)
    );

    const documentos: QuerySnapshot = await getDocs(consulta);

    if (documentos.empty) return [];

    const promesas = documentos.docs.map(async (doc) => {
      return {
        ...doc.data(),
        fecha_seguir: this.obtenerTiempoTranscurrido(
          doc.data()['fecha_seguir'].seconds
        ),
      };
    });

    const datosSeguidores = await Promise.all(promesas);
    return datosSeguidores;
  }
}
