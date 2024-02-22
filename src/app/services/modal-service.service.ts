
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModalSubject: Subject<number> = new Subject<number>();
  showModal$: Observable<number> = this.showModalSubject.asObservable();

  constructor() { }

  openModal(id: number) {
    this.showModalSubject.next(id);
  }
}


