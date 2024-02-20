import { Routes } from '@angular/router';
import { CategoriesAdminTableComponent } from './categories-admin-table/categories-admin-table.component';
import { BooksAdminTableComponent } from './books-admin-table/books-admin-table.component';
import { AuthorsAdminTableComponent } from './authors-admin-table/authors-admin-table.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
  {
      path:"",
      component: AppComponent ,
      title:"app"
  },
  {
    path: 'adminLogin',
    component: AdminLoginComponent,
    title: 'Admin Login',
  },
  {
    path:'dashBoard',
    component: DashBoardComponent,
    title: 'DashBoard'
  },
  {
    path: 'categoriesAdminTable',
    component: CategoriesAdminTableComponent,
    title: 'categories Admin Table',
  },
  {
    path: 'booksAdminTable',
    component: BooksAdminTableComponent,
    title: 'Books Admin Table',
  },
  {
    path: 'authorsAdminTable',
    component: AuthorsAdminTableComponent,
    title: 'Authors Admin Table',
  },
  //{
  //  path: 'userLogin',
  //  component: UserLoginComponent,
  //  title: 'Login',
  //},
  //{
  //  path: 'userRegister',
  //  component: UserRegisterComponent,
  //  title: 'Creat an account',
  //},
  //   {
  //     path: '**',
  //     component: NotFoundPage,
  //   },
];
