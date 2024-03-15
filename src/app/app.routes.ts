import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { CategoriesTableComponent } from './components/categoriesAdmin/categories-table/categories-table.component';
import { AdminControlPageComponent } from './pages/admin-control-page/admin-control-page.component';
import { BooksTableComponent } from './components/booksAdmin/books-table/books-table.component';
import { AuthorsTableComponent } from './components/authorsAdmin/authors-table/authors-table.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { AuthorsPageComponent } from './pages/authors-page/authors-page.component';
import { CategoriesComponent } from './components/userPageComponents/Categories/categories/categories.component';
import { ShowCategoryBooksCardComponent } from './components/userPageComponents/Categories/show-category-books-card/show-category-books-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookComponent } from './components/userPageComponents/Books/book/book.component';
import { BookCardComponent } from './components/userPageComponents/Books/book-card/book-card.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component.js';
import { UserLoginGuard } from './user-login.guard';
import { AdminLoginGuard } from './login-guard.guard';
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
    path: 'userSignUp',
    component: SignupComponent,
    title: 'Sign Up',
  },
  {
    path: 'userHome',
    component: UserPanelComponent,
    title: 'Home',
    canActivate: [UserLoginGuard],
  },
  {
    path: 'adminControlPage',
    component: AdminControlPageComponent,
    title: 'Admin ControlPage',
    canActivate: [AdminLoginGuard],
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
    canActivate: [AdminLoginGuard],
  },
  {
    path: 'adminControlPage/booksTable',
    component: BooksTableComponent,
    title: 'Books Table',
    canActivate: [AdminLoginGuard],
  },
  {
    path: 'adminControlPage/authorsTable',
    component: AuthorsTableComponent,
    title: 'Authors Table',
    canActivate: [AdminLoginGuard],
  },
  {
    path: 'authors/author/:id/:name',
    component: AuthorDetailsComponent,
    canActivate: [UserLoginGuard],
  },
  {
    path: 'authors',
    component: AuthorsPageComponent,
    title: 'Authors Page',
    canActivate: [UserLoginGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'categories names page',
    canActivate: [UserLoginGuard],
  },
  {
    path: 'category-details/:id/:pageNum/:pageSize',
    component: ShowCategoryBooksCardComponent,
    title: 'categories List page',
    canActivate: [UserLoginGuard],
  },
  {
    path: 'adminControlPage/add-admin',
    component: AddAdminComponent,
    data: { title: 'Add Admin' },
    canActivate: [AdminLoginGuard],
  },
  {
    path: 'books',
    component: BookComponent,
    title: 'Books',
    canActivate: [UserLoginGuard],
  },
  {
    path: 'books/book/:id/:name',
    component: BookCardComponent,
    title: 'Book Details',
    canActivate: [UserLoginGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },

  //   {
  //     path: '**',
  //     component: NotFoundPage,
  //   },
];
