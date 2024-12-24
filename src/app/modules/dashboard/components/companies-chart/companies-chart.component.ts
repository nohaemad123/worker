import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
      direction?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-companies-chart',
  templateUrl: './companies-chart.component.html',
  styleUrl: './companies-chart.component.scss'
})
export class CompaniesChartComponent implements OnInit {

  @Input() chartData: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "الشركات",
          data: this.chartData?.map((company: any) => company?.count)
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false
        },
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#4F008D",
        "#FABD13",
        "#4F008D",
        "#FABD13",
        "#4F008D",
        "#FABD13",
        "#4F008D",
        "#FABD13",
        "#4F008D",
        "#FABD13",
        "#4F008D",
        "#FABD13",
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
          borderRadius: 3
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      yaxis: {
        opposite: true,
      },
      xaxis: {
        categories: this.chartData?.map((company: any) => company?.month),
        labels: {
          style: {
            colors:
              "#333",
            fontSize: "14px"
          }
        },
      }
    };
  }
}
