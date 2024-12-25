import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobDetail } from '../../interfaces/jobs.interface';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {

  @Input() data?: JobDetail;
  @Input() isSelectionOn:boolean = true;
  @Input() isCompactCard: boolean = true;
  @Output() toggleJobSelection = new EventEmitter<JobDetail>();

  toggleFavorite = (): void => {
    if (this.data) {
      this.toggleJobSelection.emit(this.data);
    }
  };
}
