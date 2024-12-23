import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { JobsService } from '../../services/jobs.service';
import { JobDetail } from '../../interfaces/jobs.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, JobCardComponent],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit, OnDestroy {

  id: string = '';
  data: JobDetail | undefined;
  jobDescription: SafeHtml | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.id = params.get('id') || '';
      this.loadJobDetails();
    });
  }

  private loadJobDetails(): void {
    if (!this.id) return;
    this.jobsService.getJobDetails(this.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.data = res;
        this.jobDescription = this.sanitizer.bypassSecurityTrustHtml(res.description || '');
      },
      error: (err) => {
        console.error('Error fetching job details:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
