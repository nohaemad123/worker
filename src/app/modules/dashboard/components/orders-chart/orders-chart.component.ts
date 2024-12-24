import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ApexPlotOptions, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors?: string[];
  plotOptions?: ApexPlotOptions;
};

@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
  styleUrl: './orders-chart.component.scss'
})
export class OrdersChartComponent implements OnInit {

  @Input() chartData: any;
  @ViewChild("orders-chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.chartOptions = {
      series: this.chartData.map((order: any) => order?.count),
      chart: {
        type: "donut"
      },
      labels: this.chartData.map((order: any) => order?.status),
      // colors: ["#4F008D", "#FABD13", "#3C006B", "#0B0311"],
      colors: ["#4F008D", "#FABD13", "#0B0311"],
      plotOptions: {
        pie: {
          donut: {
            size: '50%', // Adjust this to increase the thickness (e.g., 75% will make the slices thicker)
            labels: {
              show: true
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
