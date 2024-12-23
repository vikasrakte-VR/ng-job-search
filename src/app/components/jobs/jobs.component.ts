import { Component, OnDestroy, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { JobsService } from '../../services/jobs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnDestroy {
  currentRoute: string = '';
  favoriteJobs: WritableSignal<number[]> = this.jobsService.favoriteJobs;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private jobsService: JobsService
  ) {
    this.trackCurrentRoute();
  }

  private trackCurrentRoute(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.currentRoute = this.router.url;
      },
      error: (err) => {
        console.error('Error tracking route changes:', err);
      }
    });
  }

  isRouteActive(route: string): boolean {
    console.log("sdsdsd")
    return this.currentRoute === route;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
