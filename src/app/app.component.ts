import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobsService } from './services/jobs.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[JobsService]
})
export class AppComponent {

}
