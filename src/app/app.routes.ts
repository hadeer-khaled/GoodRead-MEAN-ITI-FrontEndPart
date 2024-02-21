import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { CategoriesTableComponent } from './components/categoriesAdmin/categories-table/categories-table.component';
import { AdminControlPageComponent } from './pages/admin-control-page/admin-control-page.component';
import { BooksTableComponent } from './components/booksAdmin/books-table/books-table.component';
import { AuthorsTableComponent } from './components/authorsAdmin/authors-table/authors-table.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    title: 'Main Page',
  },
  {
    path: 'adminLogin',
    component: AdminLoginComponent,
    title: 'Admin Login',
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
  //   {
  //     path: '**',
  //     component: NotFoundPage,
  //   },
];
