// import { Component, Input, OnInit, ViewChild } from "@angular/core";
// import { ApexPlotOptions, ChartComponent } from "ng-apexcharts";

// import {
//   ApexNonAxisChartSeries,
//   ApexResponsive,
//   ApexChart
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: ApexResponsive[];
//   labels: any;
//   colors?: string[];
//   plotOptions?: ApexPlotOptions;
// };

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
  selector: 'app-services-chart',
  templateUrl: './services-chart.component.html',
  styleUrl: './services-chart.component.scss'
})
export class ServicesChartComponent implements OnInit {

  @Input() chartData: any;
  @ViewChild("services-chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    // this.chartOptions = {
    //   series: this.chartData.map((service: any) => service?.count),
    //   chart: {
    //     type: "donut"
    //   },
    //   labels: this.chartData.map((service: any) => service?.isActive ? 'الخدمات النشطة' : 'الخدمات الغير نشطة'),
    //   colors: ["#4F008D", "#FABD13"],
    //   plotOptions: {
    //     pie: {
    //       donut: {
    //         size: '40%', // Adjust this to increase the thickness (e.g., 75% will make the slices thicker)
    //         labels: {
    //           show: true
    //         }
    //       }
    //     }
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 300,
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };
    this.chartOptions = {
      series: [
        {
          name: "تسعير الخدمات",
          data: this.chartData?.map((service: any) => service?.count)
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
        categories: this.chartData?.map((service: any) => service?.month),
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
