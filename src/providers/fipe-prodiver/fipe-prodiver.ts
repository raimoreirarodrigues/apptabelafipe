import { Injectable } from '@angular/core';
import { urlBase } from '../../urlBase';
import { Http } from '@angular/http';

@Injectable()
export class FipeProdiverProvider {

  constructor(public http: Http) {}
  getMarcas(tipo) {
    return this.http.get(urlBase + tipo+"/marcas");
  }

  getModelos(tipo,idMarca) {
    return this.http.get(urlBase + tipo+"/marcas/"+idMarca+"/modelos");
  }

  getVersoes(tipo,idMarca,idModelo){
    return this.http.get(urlBase + tipo+"/marcas/"+idMarca+"/modelos/"+idModelo+"/anos");
  }

  resultadoConsulta(tipo,idMarca,idModelo,idVersao){
    return this.http.get(urlBase + tipo+"/marcas/"+idMarca+"/modelos/"+idModelo+"/anos/"+idVersao);
  }


}
