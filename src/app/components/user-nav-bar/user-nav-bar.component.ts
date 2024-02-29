import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../interfaces/author';

@Component({
  selector: 'app-user-nav-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-nav-bar.component.html',
  styleUrl: './user-nav-bar.component.css'
})

export class UserNavBarComponent {
  authors: any[] = []; // Adjust the type according to your Author interface or type
  query: string = '';
  authorsNames: string[] = [];

  constructor(private router: Router, private authorService: AuthorService) {}

  ngOnInit() {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      (response: any[]) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
        this.authorsNames = this.authors.map(author => author.firstName + ' ' + author.lastName);
        console.log('authorsNames', this.authorsNames);
      },
      (error: any) => {
        console.error('Error getting authors:', error);
      }
    );
  }

  doesAuthorContainQuery(query: string): boolean {
    for (const name of this.authorsNames) {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  search() {
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
