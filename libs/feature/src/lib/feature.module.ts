import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { featureRoutes} from './feature.routes';
import { FeatureComponent } from './feature.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
   FeatureComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(featureRoutes),
    HeaderComponent
  ],
})
export class FeatureModule { }
