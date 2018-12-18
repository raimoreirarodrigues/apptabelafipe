import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { FipeProdiverProvider } from '../../providers/fipe-prodiver/fipe-prodiver';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FipeProdiverProvider]
})
export class HomePage {
  tipoVeiculo: any;
  marcaVeiculo: any;
  modeloVeiculo: any;
  versaoVeiculo: any;
  mostrarResultado = false;
  tiposVeiculos: any = ['carros', 'motos', 'caminhoes'];
  marcasVeiculos: any = [];
  modelosVeiculos: any = [];
  resultadosConsulta: any = [];
  versoesVeiculos: any = [];

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, private consultaFipe: FipeProdiverProvider, public navCtrl: NavController) { }

  consultarMarcas() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando marcas...',
      spinner: 'bubbles'
    });
    this.modelosVeiculos = [];
    this.versoesVeiculos = [];
    loading.present();
    if (this.tipoVeiculo != undefined) {
      this.consultaFipe.getMarcas(this.tipoVeiculo).subscribe(data => {
        loading.dismiss();
        const response = (data as any);
        this.marcasVeiculos = [];
        this.marcasVeiculos = JSON.parse(response._body);
      }, error => {
        loading.dismiss();
        this.toastCtrl.create({
          duration: 2500,
          message: 'Nenhuma marca encontrada',
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fechar'
        }).present();;
      });
    }
  }
  consultarModelos() {
    this.versoesVeiculos = [];
    let loading = this.loadingCtrl.create({
      content: 'Buscando modelos...',
      spinner: 'bubbles'
    });
    loading.present();
    if (this.marcaVeiculo != undefined) {
      this.consultaFipe.getModelos(this.tipoVeiculo, this.marcaVeiculo).subscribe(data => {
        loading.dismiss();
        const response = (data as any);
        this.modelosVeiculos = [];
        this.modelosVeiculos = JSON.parse(response._body).modelos;
      }, error => {
        loading.dismiss();
        this.toastCtrl.create({
          duration: 2500,
          message: 'Nenhum modelo encontrado',
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fechar'
        }).present();;
      });
    }
  }

  consultarVersoes() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando versões...',
      spinner: 'bubbles'
    });
    loading.present();
    if (this.marcaVeiculo != undefined) {
      this.consultaFipe.getVersoes(this.tipoVeiculo, this.marcaVeiculo, this.modeloVeiculo).subscribe(data => {
        loading.dismiss();
        const response = (data as any);
        this.versoesVeiculos = [];
        this.versoesVeiculos = JSON.parse(response._body);
      }, error => {
        loading.dismiss();
        this.toastCtrl.create({
          duration: 2500,
          message: 'Nenhuma versão encontrada',
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fechar'
        }).present();;
      });
    }
  }

  verificarDadosPreenchidos() {
    if (this.tipoVeiculo != undefined && this.marcaVeiculo != undefined && this.modeloVeiculo != undefined && this.versaoVeiculo != undefined) {
      return false;
    }
    return true;
  }

  resultadoFinal() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando resultado...',
      spinner: 'bubbles'
    });
    loading.present();
    this.consultaFipe.resultadoConsulta(this.tipoVeiculo, this.marcaVeiculo, this.modeloVeiculo, this.versaoVeiculo).subscribe(data => {
      loading.dismiss();
      const response = (data as any);
      this.resultadosConsulta = [];
      this.resultadosConsulta = JSON.parse(response._body);
      this.mostrarResultado = true;
    }, error => {
      loading.dismiss();
      this.toastCtrl.create({
        duration: 2500,
        message: 'Nenhum resultado foi encontrado',
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Fechar'
      }).present();;
    });

  }

}
