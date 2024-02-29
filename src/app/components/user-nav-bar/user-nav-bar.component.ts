import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../interfaces/author';
import { BookService } from '../../book.service';
import { Book } from '../../interfaces/book';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-user-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './user-nav-bar.component.html',
  styleUrl: './user-nav-bar.component.css',
})
export class UserNavBarComponent {
  // loggedUser = localStorage.getItem('loggedUser')
  authors: Author[] = []; 
  books: Book[] = [];
  categories: Category[] = []; 

  query: string = '';
  id: string= '';

  authorsNames: { id: string, name: string }[] = []; 
  booksNames: { id: string, name: string }[] = [];
  categoriesNames: { id: string, name: string }[] = []; 
  
  constructor(private router: Router, 
    private authorService: AuthorService,
    private bookService: BookService,
    private categoryService: CategoryService) {}

 

  ngOnInit() {
    this.getAllAuthors();
    this.getAllBooks();
    this.getAllCategories();
  }

  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      (response: any[]) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
        this.authorsNames = this.authors.map(
          (author) => author.firstName + ' ' + author.lastName
        );
        this.authorsNames = this.authors.map(author => ({ id: author._id, name: author.firstName + ' ' + author.lastName }));
        console.log('authorsNames', this.authorsNames);
      },
      (error: any) => {
        console.error('Error getting authors:', error);
      }
    );
  }

  doesAuthorContainQuery(query: string): boolean {
    for (const author of this.authorsNames) {
      if (author.name.toLowerCase().includes(query.toLowerCase())) {
        this.query = author.name;
        console.log(this.authorsNames);
        console.log(this.query);
        return true;
      }
    }
    return false;
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (response: any[]) => {
        console.log('Subscribe response', response);
        this.books = response;
        console.log('this.books', this.books);
        this.booksNames = this.books.map(book => ({ id: book._id, name: book.title }));
        console.log('booksNames', this.booksNames);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }

  doesBookContainQuery(query: string): boolean {
    for (const book of this.booksNames) {
      if (book.name.toLowerCase().includes(query.toLowerCase())) {
        this.query = book.name;
        console.log(this.booksNames);
        console.log(this.query);
        return true;
      }
    }
    return false;
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: any[]) => {
        console.log('Subscribe response', response);
        this.categories = response;
        console.log('this.categories', this.categories);
        this.categoriesNames = this.categories.map(category => ({ id: category._id, name: category.name }));
        console.log('categoriesNames', this.categoriesNames);
      },
      (error: any) => {
        console.error('Error getting categories:', error);
      }
    );
  }
  
  doesCategoryContainQuery(query: string): boolean {
    for (const category of this.categoriesNames) {
      if (category.name.toLowerCase().includes(query.toLowerCase())) {
        this.query = category.name;
        console.log(this.categoriesNames);
        console.log(this.query);
        return true;
      }
    }
    return false;
  }

  search(id: string, name: string) {
    if (this.query.trim() !== '' && this.doesAuthorContainQuery(this.query)) {
      this.router.navigate(['author', this.query]);
    }
  }
}

// export class UserNavBarComponent {
//   authors : Array<Author> = []
//   query: string = '';
//   authorsNames!:any

//   constructor(private router: Router,private http: AuthorService) {
//    }
//    getAllAuthors() {
//     this.http.getAuthors().subscribe(
//       (response: any) => {
//         console.log('Subscribe response', response);
//         this.authors = response;
//         console.log('this.authors', this.authors);
//         this.authorsNames = this.authors.map(obj => obj.firstName+''+obj.lastName);
//         console.log('authorsNames', this.authorsNames);
//       },
//       (error: any) => {
//         console.error('Error getting books:', error);
//       }
//     );
//   }

//   doesAutherContainQuery(query: string): boolean {
//     for (const name of this.authorsNames) {
//       if (name.toLowerCase().includes(query.toLowerCase())) {
//         return true;
//       }
//     }
//     return false;
//   }

//   search(){
//     if (this.query.trim() !== '') {
//       if (this.doesAutherContainQuery(this.query))
//       this.router.navigate(['/author', this.query]);
//     }
//   }

// }
      name = this.query;
      const author = this.authorsNames.find(author => author.name.toLowerCase() === name.toLowerCase());
      if (author) {
        id = author.id;
        this.router.navigate(['authors/author', id, name]);
      } else {
        console.error('Author not found');
      }
    }
    if (this.query.trim()!== '' && this.doesBookContainQuery(this.query)) {
      name = this.query;
      const book = this.booksNames.find(book => book.name.toLowerCase() === name.toLowerCase());
      if (book) {
        id = book.id;
        this.router.navigate(['books/book', id, name]);
      } else {
        console.error('Book not found');
      }
  }
  if (this.query.trim()!== '' && this.doesCategoryContainQuery(this.query)) {
    name = this.query;
    const category = this.categoriesNames.find(category => category.name.toLowerCase() === name.toLowerCase());
    if (category) {
      id = category.id;
      this.router.navigate(['categories/category', id, name]);
    } else {
      console.error('Category not found');
    }
  
}
  }
 



  // logOut(){
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('loggedUser')
  //   console.log(localStorage.getItem('loggedUser'))
  //   this.loggedUser = null
  //   this.router.navigate(['/'])
    
  // }
}



