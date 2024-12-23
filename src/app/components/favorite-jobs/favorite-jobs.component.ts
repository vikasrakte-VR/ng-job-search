import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobSummary } from '../../interfaces/jobs.interface';
import { JobsService } from '../../services/jobs.service';
import { JobCardComponent } from '../job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { map, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './favorite-jobs.component.html',
  styleUrls: ['./favorite-jobs.component.css']
})
export class FavoriteJobsComponent implements OnInit, OnDestroy {

  listOfFavoriteJobs: JobSummary[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private jobService: JobsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavoriteJobs();
  }

  /**
   * Load favorite jobs from the service and filter them based on stored favorites.
   */
  private loadFavoriteJobs(): void {
    this.jobService.getAllJobs()
      .pipe(
        map(jobs => this.filterFavoriteJobs(jobs)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: favorites => (this.listOfFavoriteJobs = favorites),
        error: err => console.error('Error fetching favorite jobs:', err)
      });
  }

  /**
   * Filter jobs to only include those marked as favorites.
   * @param jobs - List of all jobs.
   */
  private filterFavoriteJobs(jobs: JobSummary[]): JobSummary[] {
    const favoriteJobIds = this.jobService.favoriteJobs();
    return jobs.filter(job => favoriteJobIds.includes(job.id));
  }

  /**
   * Navigate to the job details page.
   * @param job - The job whose details to show.
   */
  showDetails(job: JobSummary): void {
    this.router.navigate(['/jobs/details', job.id]);
  }

  /**
   * Cleanup subscriptions on component destroy.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
