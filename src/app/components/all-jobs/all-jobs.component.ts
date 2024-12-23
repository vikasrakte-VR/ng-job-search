import { Component, OnInit, OnDestroy, WritableSignal } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { JobSummary } from '../../interfaces/jobs.interface';
import { JobsService } from '../../services/jobs.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent implements OnInit, OnDestroy {
  listOfAllJobs: JobSummary[] = [];
  favoriteJobs:WritableSignal<number[]> = this.jobService.favoriteJobs;
  private destroy$ = new Subject<void>();

  constructor(
    private jobService: JobsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobsWithFavorites();
  }

  /**
   * Fetch all jobs and mark favorites on initialization.
   */
  private loadJobsWithFavorites(): void {
    this.jobService.getAllJobs()
      .pipe(
        map(jobs => this.mapJobsWithFavorites(jobs)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: jobs => (this.listOfAllJobs = jobs),
        error: err => console.error('Error fetching jobs:', err)
      });
  }

  /**
   * Map jobs with their favorite status.
   * @param jobs - Array of job summaries.
   */
  private mapJobsWithFavorites(jobs: JobSummary[]): JobSummary[] {
    const favoriteJobIds = this.favoriteJobs();
    return jobs.map(job => ({
      ...job,
      isFavorite: favoriteJobIds.includes(job.id)
    }));
  }

  /**
   * Toggle favorite status of a job.
   * @param job - The job to toggle favorite status for.
   */
  toggleJobSelection(job: JobSummary): void {
    job.isFavorite = !job.isFavorite;
    this.jobService.toggleFavoriteJob(job.id);
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
