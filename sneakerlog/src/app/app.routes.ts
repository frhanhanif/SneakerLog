import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import("./components/sneakers-list/sneakers-list.component")
    }
];
