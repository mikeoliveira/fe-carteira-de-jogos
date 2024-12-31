import { HomeComponent } from './containers/home/home.component';
import { ValidarJogoComponent } from './containers/validar-jogo/validar-jogo.component';
import { FeatureComponent } from './feature.component';
import { Route } from '@angular/router';

export const featureRoutes: Route[] = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'validar-jogo',
        component: ValidarJogoComponent
      }
    ],
  },
];
