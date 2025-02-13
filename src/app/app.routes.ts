import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'table-view',
        loadComponent: () => import("./pages/home/home.component")
    },
    {
        path:'',
        loadComponent: () => import("./pages/sneakers-list/sneakers-list.component")
    },
    {
        path:'sneaker-detail/:sneaker-id',
        loadComponent: () => import("./pages/sneaker-detail/sneaker-detail.component")
    },
    {
        path:'price-info',
        loadComponent: () => import("./pages/price-info/price-info.component")
        
    },
    
];
