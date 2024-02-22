import { Injectable } from '@angular/core';
import {Categories} from '../../../Categories.json'

@Injectable({
  providedIn: 'root' 
})
export class DataService {
categories : any = Categories
  constructor() { }

  updateCategory(id: number, newName: string): void {
    const index = this.categories.findIndex((category: { id: number; }) => category.id === id);
    if (index !== -1) {
      this.categories[index].categoryName = newName;
    }
  }
}