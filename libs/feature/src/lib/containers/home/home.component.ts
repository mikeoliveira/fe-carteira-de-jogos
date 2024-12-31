import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { ListaJogosComponent } from '../../components/lista-jogos/lista-jogos.component';
import { DataManagerService } from '@fe-carteira-de-jogos/infrastructure';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatChipsModule, MatProgressBarModule, MatButtonModule, ListaJogosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  jogoForm!: FormGroup;
  validaJogoForm!: FormGroup;

  arrayNumeros: any[] = [];
  arrayNumeroJogo: any[] = [];
  count = 1;

  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

  constructor(private dataManagerService: DataManagerService) { }
  ngOnInit(): void {  

    this.jogoForm = new FormGroup({
      numero1: new FormControl(''),
      numero2: new FormControl(''),
      numero3: new FormControl(''),
      numero4: new FormControl(''),
      numero5: new FormControl(''),
      numero6: new FormControl(''),
    }); 

    this.dataManagerService.getDataObservable().subscribe(
      (data) => {
        if(data)
        this.arrayNumeros = data;
      }
    );
  }

  numero = new FormControl('');

  
  onSubmit() { 
    if (this.verificarNumerosDiferentes() && this.verificarNumerosMenoresQue61()) {
      let contador = this.count++;
      console.log(this.arrayNumeros)
      if(this.arrayNumeros && this.arrayNumeros.length !== 0) {
        contador = this.arrayNumeros.length;
        console.log('contador', contador);	
        contador = ++contador;
      }
      this.arrayNumeros.push({id: contador ,jogo: contador, numeros: this.obterNumerosOrdenados(), numeros_acertos: 0});
      this.dataManagerService.setData(this.arrayNumeros);
      this.jogoForm.reset();
    }
  }

  verificarNumerosDiferentes(): boolean {
    const valores = Object.values(this.jogoForm.value);
    
    // Filtrar valores válidos (evitando espaços em branco ou valores vazios)
    const valoresFiltrados = valores.filter((v) => v !== '');

  
    // Verificar duplicatas usando um conjunto (Set)
    const valoresUnicos = new Set(valoresFiltrados);

  
    // Se o tamanho do conjunto for menor que o array original, há duplicatas
    if(valoresFiltrados.length === valoresUnicos.size) {
      return true;
    }
    else {
      alert('Os números devem ser diferentes');
      return false;
    }
    
  }

  verificarNumerosMenoresQue61(): boolean {
    const valores = Object.values(this.jogoForm.value);
  
    // Filtrar valores válidos (removendo valores vazios ou inválidos)
    const numeros = valores
      .filter((v) => v !== '') // Ignora campos vazios
      .map((v) => Number(v))   // Converte para números
  
      // Verifica se todos os valores são números válidos e menores que 60
    if(numeros.every((numero) => !isNaN(numero) && numero < 61)) {
      return true;
    }else{
      alert('Os números devem ser entre 1 e 60');
      return false;
    }
  }

  obterNumerosOrdenados(): number[] {
    const valores = Object.values(this.jogoForm.value);
  
    // Filtrar valores válidos (removendo campos vazios ou inválidos) e convertê-los em números
    const numeros = valores
      .filter((v) => v !== '') // Ignorar campos vazios
      .map((v) => Number(v))   // Converter para números
      .filter((n) => !isNaN(n)); // Remover valores não numéricos
  
    // Ordenar os números do menor para o maior
    return numeros.sort((a, b) => a - b);
  }

  getControlNames(): string[] {
    return Object.keys(this.jogoForm.controls);
  }

  adicionarCampo(){
    if (this.jogoForm instanceof FormGroup) {
      const novoCampoNome = `numero${Object.keys(this.jogoForm.controls).length + 1}`;
      this.jogoForm.addControl(novoCampoNome, new FormControl(''));
    } else {
      console.error('jogoForm não é uma instância válida de FormGroup');
    }
  }

  adicionar(numeroJogo: any) {
    this.arrayNumeros.push({id: this.count++ ,jogo: numeroJogo, numero: this.numero.value, numeros_acertos: 0});
    this.jogoForm.reset();
  }

  criarJogos() {
    this.arrayNumeroJogo.push(this.arrayNumeroJogo.length + 1);
  }

  filterNumerosPorJogo(jogo: any) {
    return this.arrayNumeros.filter((item) => item.jogo == jogo);
  }

  contarOcorrencias(valor: any, arrayValores: any): number {

    const valores = arrayValores
  
    // Filtrar valores válidos (removendo campos vazios ou inválidos) e convertê-los para números
    const numeros = valores
      .filter((v:any) => v !== '') // Ignorar campos vazios
      .map((v:any) => Number(v))   // Converter para números
      .filter((n:any) => !isNaN(n)); // Remover valores não numéricos
  
    // Contar as ocorrências do valor
    const ocorrencias = numeros.filter((n:any) => n === Number(valor)).length;

    return ocorrencias;
  }

  onSubmitvalidador(){
    Object.values(this.validaJogoForm.value).map((n) => {
      Object.values(this.arrayNumeros).map((index, i) => {
        let contador = 0;
        contador = this.contarOcorrencias(n, index.numeros) + contador;  
        this.arrayNumeros[i].numeros_acertos += contador ;
      })
    });
  }

  limparJogos() {
    this.arrayNumeros = [];
    this.count = 1;
    this.dataManagerService.clearData();
  }
}

