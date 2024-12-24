import { Component, Input, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";

const series = {
  monthDataSeries1: {
    prices: [
      100,
      200,
      400,
      150,
      300,
      50,
      500,
      1000,
      250,
      180,
      550,
      900
    ],
    dates: [
      "1 Jan 2017",
      "1 Feb 2017",
      "1 Mar 2017",
      "1 Apr 2017",
      "1 May 2017",
      "1 Jun 2017",
      "1 Jul 2017",
      "1 Aug 2017",
      "1 Sep 2017",
      "1 Oct 2017",
      "1 Nov 2017",
      "1 Dec 2017",
    ]
  },
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-workers-chart',
  templateUrl: './workers-chart.component.html',
  styleUrl: './workers-chart.component.scss'
})
export class WorkersChartComponent implements OnInit {

  @Input() chartData: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "عامل",
          data: this.chartData?.map((worker: any) => worker?.count)
        }
      ],
      chart: {
        type: "area",
        height: 250,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        // colors: ["#4F008D"],
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          gradientToColors: ["#4F008D"], // End color of the gradient
          opacityFrom: 0.7, // Starting opacity
          opacityTo: 0.3,   // Ending opacity
          stops: [0, 90, 100] // Gradient transition points
        }
      },
      stroke: {
        curve: "smooth",
        colors: ["#4F008D"]
      },
      labels: series.monthDataSeries1.dates,
      // labels: this.chartData?.map((worker: any) => worker?.month),
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

}
