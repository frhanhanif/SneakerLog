import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import("./components/sneakers-list/sneakers-list.component")
    },
    {
        path:'sneaker-detail',
        loadComponent: () => import("./components/sneakers-list/sneaker/sneaker-detail/sneaker-detail.component")
    },
    {
        path:'sneaker-detail/price-info',
        loadComponent: () => import("./components/sneakers-list/sneaker/sneaker-detail/price-info/price-info.component")
    },
    
];
