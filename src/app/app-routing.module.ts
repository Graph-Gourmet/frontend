import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { DocumentationViewComponent } from './views/documentation-view/documentation-view.component';
import { TeamViewComponent } from './views/team-view/team-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeViewComponent },
  { path: 'team', component: TeamViewComponent },
  { path: 'documentation', component: DocumentationViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
