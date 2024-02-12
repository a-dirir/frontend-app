import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// admin routes
import { UserComponent } from './pages/admin/authorization/user/user.component';
import { GroupComponent } from './pages/admin/authorization/group/group.component';
import { PolicyComponent } from './pages/admin/authorization/policy/policy.component';
import { ApiKeysComponent } from './pages/admin/authorization/api-keys/api-keys.component';

// app routes
import { AlarmsComponent } from './pages/app/monitoring/templates/alarms/alarms.component';
import { ProductsComponent } from './pages/app/assets/products/products.component';
import { UsageComponent } from './pages/app/assets/usage/usage.component';
import { ResourcesComponent } from './pages/app/assets/resources/resources.component';


const routes: Routes = [
  { path: 'admin/authorization/users',  component: UserComponent },
  { path: 'admin/authorization/groups',  component: GroupComponent },
  { path: 'admin/authorization/policies',  component: PolicyComponent},
  { path: 'admin/authorization/api_keys',  component: ApiKeysComponent},


  { path: 'app/monitoring/templates/alarms',  component: AlarmsComponent },

  { path: 'app/assets/products', component: ProductsComponent},
  { path: 'app/assets/usage', component: UsageComponent},
  { path: 'app/assets/resources', component: ResourcesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
