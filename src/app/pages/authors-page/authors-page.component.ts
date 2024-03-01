import { Component } from '@angular/core';
import { Author } from '../../interfaces/author';
import { AuthorService } from '../../services/author.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserNavBarComponent } from '../../components/user-nav-bar/user-nav-bar.component.js';

@Component({
  selector: 'app-authors-page',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive, NgbPaginationModule,UserNavBarComponent],
  templateUrl: './authors-page.component.html',
  styleUrl: './authors-page.component.css'
})
export class AuthorsPageComponent {
  authors!: Array<Author>;
  constructor(private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  // ================= Get All Authors =================== \\
  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }

}

