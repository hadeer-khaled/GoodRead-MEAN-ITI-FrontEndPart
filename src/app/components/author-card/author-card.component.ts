 import { Component, Input, EventEmitter, Output } from '@angular/core';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {
  

  constructor(private router : Router) { }

  @Input() currentAuthor!: any ;

  showDetails(id : any, name: any ){
    console.log(this.currentAuthor);
    this.router.navigate(['/authors/author' , id , name])
  }
  
}
