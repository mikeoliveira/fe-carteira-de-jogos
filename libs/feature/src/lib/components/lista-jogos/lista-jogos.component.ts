import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { DataManagerService } from '@fe-carteira-de-jogos/infrastructure';
import { Observable } from 'rxjs';
@Component({
  selector: 'lib-lista-jogos',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './lista-jogos.component.html',
  styleUrl: './lista-jogos.component.css',
})
export class ListaJogosComponent {
  
  arrayNumeros$: Observable<any[]>
  constructor(private dataManagerService: DataManagerService) { 
    this.arrayNumeros$ = this.dataManagerService.getDataObservable();
  }
}
