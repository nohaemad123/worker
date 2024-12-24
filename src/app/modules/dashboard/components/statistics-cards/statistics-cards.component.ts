import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-cards',
  templateUrl: './statistics-cards.component.html',
  styleUrl: './statistics-cards.component.scss'
})
export class StatisticsCardsComponent implements OnInit {

  @Input() statisticsData: any;
  cardsData = [];

  ngOnInit(): void {
    this.cardsData = [
      {
        id: 1,
        icon: 'companies-icon.svg',
        title: 'companies',
        count: this.statisticsData.companiesCount,
        text: 'companies_count',
        link: '/Companies'
      },
      {
        id: 2,
        icon: 'workers-icon.svg',
        title: 'workers',
        count: this.statisticsData.workersCount,
        text: 'workers_count',
        link: '/Workers'
      },
      {
        id: 3,
        icon: 'orders-icon.svg',
        title: 'orders',
        count: this.statisticsData.ordersCount,
        text: 'orders_count',
        link: '/Orders'
      },
      {
        id: 4,
        icon: 'services-icon.svg',
        title: 'services_pricing',
        count: this.statisticsData.servicePriceCount,
        text: 'services_pricing_count',
        link: '/Services-Pricing'
      }
    ].filter(item => item.count != null);
  }
}
