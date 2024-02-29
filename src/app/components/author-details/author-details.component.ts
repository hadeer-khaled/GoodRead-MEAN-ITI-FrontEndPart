import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../interfaces/author';
import { AuthorService } from '../../services/author.service';
import { UserNavBarComponent } from '../user-nav-bar/user-nav-bar.component';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [UserNavBarComponent],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css',
})
export class AuthorDetailsComponent {
  authors = [
    {
      id: 'ded6041a-622f-4fb4-81e4-96fcfdad4dff',
      title: 'Ping Pong Championship',
      description:
        "Enter the world of Ping Pong Championship and compete against the world's best to become the ultimate champion in this exciting game.",
      genre: 'Sports',
      released: '02/25/2005',
      ageRating: '3+',
      price: 14.99,
      discountedPrice: 4.79,
      onSale: true,
      image:
        'https://static.noroff.dev/api/gamehub/0-ping-pong-championship.jpg',
      tags: ['gamehub', 'game'],
      favorite: true,
    },
    {
      id: 'e124e23f-8d25-4057-84b9-8adf6560f155',
      title: 'Assassin',
      description:
        'Experience the dramatic conflict of samurai culture and modern weaponry.',
      genre: 'Horror',
      released: '2006',
      ageRating: '16+',
      price: 13.49,
      discountedPrice: 4.79,
      onSale: true,
      image: 'https://static.noroff.dev/api/gamehub/4-assassin.jpg',
      tags: ['gamehub', 'game'],
      favorite: false,
    },
    {
      id: '14a20cf0-c230-45dd-a47f-7d0e76b73e3f',
      title: 'Boxer',
      description:
        'Step into the ring and become the champion of boxing in this thrilling game.',
      genre: 'Sports',
      released: '2010',
      ageRating: '12+',
      price: 19.99,
      discountedPrice: 19.99,
      onSale: false,
      image: 'https://static.noroff.dev/api/gamehub/7-boxer.jpg',
      tags: ['gamehub', 'game'],
      favorite: false,
    },
    {
      id: '26594301-ad8e-4691-a2ca-c774f50b1b21',
      title: 'Space War',
      description:
        'Battle it out on the Space War and assemble your team in the ultimate online playground.',
      genre: 'Action',
      released: '2008',
      ageRating: '16+',
      price: 10.49,
      discountedPrice: 10.49,
      onSale: false,
      image: 'https://static.noroff.dev/api/gamehub/5-space-war.jpg',
      tags: ['gamehub', 'game'],
      favorite: false,
    },
    {
      id: '2ace4e1d-cad7-4d35-8d59-6c9ac3e3eaf8',
      title: 'Super Duper',
      description:
        "Celebrate some of the world's supe duper Superheroes with augmented reality.",
      genre: 'Adventure',
      released: '2006',
      ageRating: '3+',
      price: 15.99,
      discountedPrice: 15.99,
      onSale: false,
      image: 'https://static.noroff.dev/api/gamehub/1-super-duper.jpg',
      tags: ['gamehub', 'game'],
      favorite: false,
    },
    {
      id: '2bbaab8b-57b0-47f6-ab8d-8d443ac767da',
      title: 'Forge Legend',
      description:
        'Unleash your inner warrior and become a legend of the forge in this epic adventure.',
      genre: 'Adventure',
      released: '2018',
      ageRating: '12+',
      price: 24.99,
      discountedPrice: 19.99,
      onSale: true,
      image: 'https://static.noroff.dev/api/gamehub/9-forge-legend.jpg',
      tags: ['gamehub', 'game'],
      favorite: true,
    },
    {
      id: '7d1741d2-71d7-4503-9788-3d0403b41a87',
      title: 'Racing',
      description:
        'Rev the engines of your race cars in our highly immersive racing game.',
      genre: 'Sports',
      released: '2008',
      ageRating: '16+',
      price: 8.49,
      discountedPrice: 3.79,
      onSale: true,
      image: 'https://static.noroff.dev/api/gamehub/6-racing.jpg',
      tags: ['gamehub', 'game'],
      favorite: false,
    },
    {
      id: 'ba43543f-b1b6-4655-aa99-1b81f8812558',
      title: 'Furious',
      description:
        'Experience the next level virtual gaming with hardcore controls, lethal weapons, customisable and intense firefights.',
      genre: 'Horror',
      released: '2004',
      ageRating: '16+',
      price: 11.99,
      discountedPrice: 3.69,
      onSale: true,
      image: 'https://static.noroff.dev/api/gamehub/3-furious.jpg',
      tags: ['gamehub', 'game'],
      favorite: false,
    },
    {
      id: 'cac3b2cd-1611-4007-9883-3adf6f74948f',
      title: 'Cyberpunk',
      description:
        'Explore the futuristic world of Cyberpunk and fight against the corrupt system to gain power and freedom.',
      genre: 'Action',
      released: '2021',
      ageRating: '18+',
      price: 59.99,
      discountedPrice: 49.99,
      onSale: true,
      image: 'https://static.noroff.dev/api/gamehub/8-cyberpunk.jpg',
      tags: ['gamehub', 'game'],
      favorite: true,
    },
    {
      id: 'e80df958-5f7f-4c2d-a2df-315134d25b56',
      title: 'Black',
      description:
        'Immerse yourself in two distinct single player in the world of sci-fi gaming.',
      genre: 'Action',
      released: '2005',
      ageRating: '18+',
      price: 12.49,
      discountedPrice: 4.79,
      onSale: true,
      image: 'https://static.noroff.dev/api/gamehub/2-black.jpg',
      tags: ['gamehub', 'game'],
      favorite: true,
    },
  ];

  authorDetails: any;

  @Input() id: string = '';
  name?: string = '';

  // constructor(private activeRouter: ActivatedRoute){}
  ngOnInit() {
    this.authorDetails = this.authors.find((author: any) => {
      return author.id === this.id;
    });
    console.log(this.authorDetails.id);
  }
}
