import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../interfaces/author';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  
  author!: Author 
  authorId! : string

  constructor(private authorService: AuthorService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.authorId = this.route.snapshot.params['id'];
    console.log('Author ID:', this.authorId); 
    this.getAuthorDetails(this.authorId);
    console.log('this.author', this.author);
  }
  
  getAuthorDetails(id: string) {
    this.authorService.getAuthorById("65d672bd6bcaed141fdf80eb").subscribe(
      (response: Author) => {
        this.author = response;
        console.log('Author details:', this.author); 
      },
      error => {
        console.log('Error fetching author details:', error); 
      }
    );
  }

  
}


  
  
  // authorDetails:any

//   @Input() id : string ='' 
//           name ?: string = ''

//   // constructor(private activeRouter: ActivatedRoute){}
//   ngOnInit(){
//     this.authorDetails = this.authors.find((author:any)=>{
//       return author.id === this.id
//     })
//     console.log(this.authorDetails.id)

    
    
//   }

// }
