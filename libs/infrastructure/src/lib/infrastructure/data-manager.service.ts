import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  private readonly storageKey = 'sharedData';
  private dataSubject: BehaviorSubject<any>;

  constructor() {
    // Inicializa o BehaviorSubject com dados do localStorage, se houver
    const storedData = localStorage.getItem(this.storageKey);
    this.dataSubject = new BehaviorSubject<any>(
      storedData ? JSON.parse(storedData) : null
    );
  }

  // Método para obter o BehaviorSubject como Observable
  getDataObservable() {
    return this.dataSubject.asObservable();
  }

  // Método para atualizar o valor e salvar no localStorage
  setData(value: any): void {
    this.dataSubject.next(value);
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  // Método para limpar os dados
  clearData(): void {
    this.dataSubject.next(null);
    localStorage.removeItem(this.storageKey);
  }

  // Método para obter o valor atual como array
  getData(): any[] {
    return this.dataSubject.getValue();
  }

  // Método para adicionar um item ao array
  addItem(item: any): void {
    const currentData = this.getData();
    const updatedData = [...currentData, item]; // Adiciona o novo item
    this.updateStorage(updatedData);
  }

  // Método para atualizar um item no array (encontrado pelo índice ou uma chave única)
  updateItem(index: number, newItem: any): void {
    const currentData = this.getData();
    if (index >= 0 && index < currentData.length) {
      currentData[index] = newItem; // Substitui o item no índice especificado
      this.updateStorage(currentData);
    }
  }

  // Método para remover um item do array
  removeItem(index: number): void {
    const currentData = this.getData();
    if (index >= 0 && index < currentData.length) {
      currentData.splice(index, 1); // Remove o item pelo índice
      this.updateStorage(currentData);
    }
  }

  // Método para atualizar o localStorage e o BehaviorSubject
  private updateStorage(data: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.dataSubject.next(data); // Atualiza o BehaviorSubject
  }
}
