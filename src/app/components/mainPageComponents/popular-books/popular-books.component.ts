import { Component } from '@angular/core';
import { BookCardComponent } from '../../book-card/book-card.component';
import { Books } from '../../../../../Books.json';
@Component({
  selector: 'app-popular-books',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './popular-books.component.html',
  styleUrl: './popular-books.component.css',
})
export class PopularBooksComponent {
  books = Books;
}
