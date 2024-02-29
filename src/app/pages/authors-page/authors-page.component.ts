import { Component } from '@angular/core';
import { AuthorCardComponent } from '../../components/author-card/author-card.component';
import { Author } from '../../interfaces/author';
import { AuthorService } from '../../services/author.service';
import { UserNavBarComponent } from '../../components/user-nav-bar/user-nav-bar.component';

@Component({
  selector: 'app-authors-page',
  standalone: true,
  imports: [AuthorCardComponent, UserNavBarComponent],
  templateUrl: './authors-page.component.html',
  styleUrl: './authors-page.component.css',
})
export class AuthorsPageComponent {
  authors!: Array<Author>;
  constructor(private authorService: AuthorService) {}

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
