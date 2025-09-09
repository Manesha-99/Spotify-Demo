import { Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { KendoComponent } from '../kendo/kendo.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [PlayerComponent, UserDashboardComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
