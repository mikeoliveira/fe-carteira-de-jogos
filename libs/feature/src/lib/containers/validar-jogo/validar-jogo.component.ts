import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaJogosComponent } from '../../components/lista-jogos/lista-jogos.component';
import { DataManagerService } from '@fe-carteira-de-jogos/infrastructure';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-validar-jogo',
  standalone: true,
  imports: [CommonModule, ListaJogosComponent, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './validar-jogo.component.html',
  styleUrl: './validar-jogo.component.css',
})
export class ValidarJogoComponent {
  arrayNumeros: any[] = [];
  arrayNumeros$: Observable<any[]>;
  validaJogoForm!: FormGroup;

  constructor(private dataManagerService: DataManagerService) {
    
    this.arrayNumeros$ = this.dataManagerService.getDataObservable();
    this.arrayNumeros$.subscribe(
      (data) => {
        this.arrayNumeros = data;
      }
    );

    this.validaJogoForm = new FormGroup({
      numero1: new FormControl(''),
      numero2: new FormControl(''),
      numero3: new FormControl(''),
      numero4: new FormControl(''),
      numero5: new FormControl(''),
      numero6: new FormControl(''),
    });
  }

  getControlNames(): string[] {
    return Object.keys(this.validaJogoForm.controls);
  }

  contarOcorrencias(valor: any, arrayValores: any): number {
    console.log('valror => ', valor, 'arrayValores => ', arrayValores);
    const valores = arrayValores;

    // Filtrar valores válidos (removendo campos vazios ou inválidos) e convertê-los para números
    const numeros = valores
      .filter((v: any) => v !== '') // Ignorar campos vazios
      .map((v: any) => Number(v)) // Converter para números
      .filter((n: any) => !isNaN(n)); // Remover valores não numéricos

    // Contar as ocorrências do valor
    const ocorrencias = numeros.filter((n: any) => n === Number(valor)).length;

    console.log('ocorrencias => ', ocorrencias);
    return ocorrencias;
  }

  onSubmitvalidador() {
    Object.values(this.validaJogoForm.value).map((n) => {
      console.log(n);
      Object.values(this.arrayNumeros).map((index, i) => {
        let contador = 0;
        contador = this.contarOcorrencias(n, index.numeros) + contador;
        this.arrayNumeros[i].numeros_acertos += contador;
      });
    });
  }
}
