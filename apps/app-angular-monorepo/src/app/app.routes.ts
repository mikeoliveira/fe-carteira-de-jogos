import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('@fe-carteira-de-jogos/feature').then((m) => m.FeatureModule),
    }
];
