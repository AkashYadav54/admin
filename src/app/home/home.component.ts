import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EquipmentsService } from '../services/equipments/equipments.service';
import { CategoryService } from '../services/category/category.service';
import { OrdersService } from '../services/orders/orders.service';
declare const echarts: any;

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  equipmentList: any[] = [];
  totalEquipmentCount: number = 0;
  totalcategorieCount: number = 0;
  categories: any[] = [];
  orders: any[] = [];
  totalOrderCount: number = 0;
  stats: { label: string; value: number; change: string }[] = [];

  constructor(
    private equipmentsService: EquipmentsService,
    private categoryService: CategoryService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.fetchEquipments();
    this.loadCategories();
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.totalOrderCount = this.orders.length;
        console.log('Orders Count:', this.totalOrderCount);
        this.updateStats();
        this.updateSegmentsChart();
        this.updateTotalsBarChart(); // Update bar chart
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }

  fetchEquipments(): void {
    this.equipmentsService.getAllEquipments().subscribe({
      next: (data) => {
        this.equipmentList = data;
        this.totalEquipmentCount = this.equipmentList.length;
        console.log('Total Equipment Count:', this.totalEquipmentCount);
        this.checkDataLoaded();
      },
      error: (error) => {
        console.error('Error fetching equipments:', error);
      },
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.totalcategorieCount = this.categories.length;
        console.log('Categories Count:', this.totalcategorieCount);
        this.checkDataLoaded();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  checkDataLoaded(): void {
    if (this.totalEquipmentCount > 0 && this.totalcategorieCount > 0) {
      this.updateStats();
      this.updateSegmentsChart();
      this.updateTotalsBarChart(); // Update bar chart
    }
  }

  updateStats(): void {
    this.stats = [
      {
        label: 'Total Equipment',
        value: this.totalEquipmentCount,
        change: '+2% from last month',
      },
      {
        label: 'Total Categories',
        value: this.totalcategorieCount,
        change: '+2% from last month',
      },
      {
        label: 'Total Orders',
        value: this.totalOrderCount,
        change: '+2% from last month',
      },
    ];
  }

  updateSegmentsChart(): void {
    const segmentsChart = echarts.init(
      document.getElementById('segments-chart') as HTMLElement
    );
    const segmentsOptions = {
      tooltip: { trigger: 'item' },
      legend: { orient: 'horizontal', left: 'left' },
      series: [
        {
          name: 'Total',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.totalOrderCount, name: 'Order' },
            { value: this.totalEquipmentCount, name: 'Equipment' },
            { value: this.totalcategorieCount, name: 'Categories' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    segmentsChart.setOption(segmentsOptions);
  }

  updateTotalsBarChart(): void {
    const totalsBarChart = echarts.init(
      document.getElementById('totals-bar-chart') as HTMLElement
    );

    const barChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      xAxis: {
        type: 'category',
        data: ['Orders', 'Equipment', 'Categories'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Count',
          type: 'bar',
          data: [
            this.totalOrderCount,
            this.totalEquipmentCount,
            this.totalcategorieCount,
          ],
          itemStyle: {
            color: '#322653',
          },
        },
      ],
    };

    totalsBarChart.setOption(barChartOptions);
  }

  ngAfterViewInit(): void {
    // Revenue Chart
    // const revenueChart = echarts.init(
    //   document.getElementById('revenue-chart') as HTMLElement
    // );
    // const revenueOptions = {
    //   tooltip: { trigger: 'axis' },
    //   xAxis: {
    //     type: 'category',
    //     data: ['January', 'February', 'March', 'April', 'May', 'June'],
    //   },
    //   yAxis: { type: 'value' },
    //   series: [
    //     {
    //       data: [10000, 20000, 30000, 40000, 50000, 60000],
    //       type: 'bar',
    //       color: '#6a1b9a',
    //     },
    //   ],
    // };
    // revenueChart.setOption(revenueOptions);
  }
}
