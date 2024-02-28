import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../interfaces/author';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './user-nav-bar.component.html',
  styleUrl: './user-nav-bar.component.css'
})
export class UserNavBarComponent {
  // authors : Array<Author> = []
  // query: string = '';

  // constructor(private router: Router,private http: AuthorService) {
  //   this.authors = this.http.getAuthors().subscribe()
  //  }

  // search(){
  //   if (this.query.trim() !== '') {

  //     this.router.navigate(['/search', this.query]);
  //   }
  // }

}
