import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { CatalogueComponent } from './catalogue/catalogue.component';


const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'catalogue',
    component: CatalogueComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
  // {
  //   path: 'projects/:id',
  //   component: ProjectDetailComponent
  // }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
