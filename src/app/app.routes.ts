import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { CategoriesTableComponent } from './components/categoriesAdmin/categories-table/categories-table.component';
import { AdminControlPageComponent } from './pages/admin-control-page/admin-control-page.component';
import { BooksTableComponent } from './components/booksAdmin/books-table/books-table.component';
import { AuthorsTableComponent } from './components/authorsAdmin/authors-table/authors-table.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { AuthorsPageComponent } from './pages/authors-page/authors-page.component';
export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    title: 'Main Page',
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
    title: 'Login',
  },
  {
    path: 'user',
    component: UserLoginComponent,
    title: 'Login',
  },
  {
    path: 'userHome',
    component: UserPanelComponent,
    title: 'Home',
  },
  {
    path: 'adminControlPage',
    component: AdminControlPageComponent,
    title: 'Admin ControlPage',
    children: [
      { path: 'categoriesTable', component: CategoriesTableComponent },
      { path: 'booksTable', component: BooksTableComponent },
      { path: 'authorsTable', component: AuthorsTableComponent },
    ],
  },
  {
    path: 'adminControlPage/categoriesTable',
    component: CategoriesTableComponent,
    title: 'Categories Table',
  },
  {
    path: 'adminControlPage/booksTable',
    component: BooksTableComponent,
    title: 'Books Table',
  },
  {
    path: 'adminControlPage/authorsTable',
    component: AuthorsTableComponent,
    title: 'Authors Table',
  },
  {
    path: 'authors/author/:id',
    component: AuthorDetailsComponent,
  },
  {
    path: 'authors',
    component: AuthorsPageComponent,
    title: 'Authors Page',
  }
  //   {
  //     path: '**',
  //     component: NotFoundPage,
  //   },
];
