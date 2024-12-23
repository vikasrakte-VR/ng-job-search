import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobDetail, JobSummary } from '../interfaces/jobs.interface';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private readonly baseUrl = '';
  private readonly FAVORITE_JOBS_KEY = 'favoriteJobs';

  favoriteJobs = signal<number[]>(this.getStoredFavorites());

  constructor(private http: HttpClient) {}

  /**
   * Fetch all job summaries.
   */
  getAllJobs(): Observable<JobSummary[]> {
    return this.http.get<JobSummary[]>(`${this.baseUrl}/jobs`);
  }

  /**
   * Fetch detailed information for a specific job.
   */
  getJobDetails(id: string): Observable<JobDetail> {
    return this.http.get<JobDetail>(`${this.baseUrl}/jobs/${id}`);
  }

  /**
   * Toggle the favorite status of a job.
   * @param jobId - The ID of the job to add/remove from favorites.
   */
  toggleFavoriteJob(jobId: number): void {
    const updatedFavorites = this.favoriteJobs().includes(jobId)
      ? this.favoriteJobs().filter((id) => id !== jobId)
      : [...this.favoriteJobs(), jobId];

    this.updateFavoriteJobs(updatedFavorites);
  }

  /**
   * Load stored favorite jobs from localStorage.
   */
  private getStoredFavorites(): number[] {
    try {
      const stored = localStorage.getItem(this.FAVORITE_JOBS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Update the favorite jobs list and persist it in localStorage.
   */
  private updateFavoriteJobs(updatedFavorites: number[]): void {
    this.favoriteJobs.set(updatedFavorites);
    localStorage.setItem(this.FAVORITE_JOBS_KEY, JSON.stringify(updatedFavorites));
  }
}
