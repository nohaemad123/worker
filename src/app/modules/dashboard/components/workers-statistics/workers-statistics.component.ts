import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workers-statistics',
  templateUrl: './workers-statistics.component.html',
  styleUrl: './workers-statistics.component.scss'
})
export class WorkersStatisticsComponent implements OnInit {
  @Input() statisticsData: any;
  activeWorkersCount: number = 0;
  inActiveWorkersCount: number = 0;

  ngOnInit(): void {
    this.activeWorkersCount = this.statisticsData?.filter(item => item.isActive)[0]?.count;
    this.inActiveWorkersCount = this.statisticsData?.filter(item => !item.isActive)[0]?.count;
  }

}
