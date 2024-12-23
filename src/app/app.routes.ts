
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { Routes } from '@angular/router';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component';
import { FavoriteJobsComponent } from './components/favorite-jobs/favorite-jobs.component';

export const routes: Routes = [
  {
    path: 'jobs',
    component: JobsComponent,
    children: [
      { path: '', component: AllJobsComponent },
      { path: 'favorites', component: FavoriteJobsComponent },
      { path: 'details/:id', component: JobDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: '**', redirectTo: '/jobs' },
];
