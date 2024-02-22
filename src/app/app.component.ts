import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { AuthorsTableComponent } from './components/authorsAdmin/authors-table/authors-table.component';
import { BooksTableComponent } from './components/booksAdmin/books-table/books-table.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthorsTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project';
}
