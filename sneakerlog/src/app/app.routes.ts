import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import("./components/sneakers-list/sneakers-list.component")
    },
    {
        path:'sneaker-detail',
        loadComponent: () => import("./components/sneaker-detail/sneaker-detail.component")
    }
];
