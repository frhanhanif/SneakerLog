import { Routes } from '@angular/router';

export const routes: Routes = [
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
