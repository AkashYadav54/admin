import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../../services/orders/orders.service';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  displayedColumns: string[] = [
    'orderId',
    'orderName',
    'price',
    'Phone',
    'Status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);
  statuses: string[] = ['ORDER_PLACED', 'Shipped', 'Delivered', 'Cancelled'];
  orders: any[] = [];
  selectedOrder: any;
  isDialogOpen = false;
  isDropdownOpen = false;
  searchQuery: string = '';
  selectedStatus: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('orderDetailsDialog') orderDetailsDialog!: TemplateRef<any>;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Fetch orders from the service (backend)
  fetchOrders() {
    this.ordersService.getOrders().subscribe(
      (data) => {
        console.log('Orders fetched successfully:', data);
        this.orders = data;
        this.dataSource.data = this.orders;
        this.dataSource.paginator = this.paginator;

      
        this.dataSource.filterPredicate = (order, filter) => {
          const searchText = filter.toLowerCase();
          return (
            order.orderId.toString().includes(searchText) ||
            order.customerDetail.fullName.toLowerCase().includes(searchText)
          );
        };
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  // Apply text filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchQuery = filterValue;
    this.applyCombinedFilter();
  }

  // Filter orders based on status
// Filter orders based on status
filterByStatus(status: string) {
  this.selectedStatus = status;
  this.applyCombinedFilter();
}

// Combined filter logic
applyCombinedFilter() {
  this.dataSource.data = this.orders.filter((order) => {
    const matchesSearch =
      !this.searchQuery ||
      order.orderId.toString().includes(this.searchQuery) ||
      order.customerDetail.fullName.toLowerCase().includes(this.searchQuery);

    const matchesStatus =
      !this.selectedStatus ||
      (order.orderStatus.replace('_', ' ').toLowerCase() === this.selectedStatus.toLowerCase());

    return matchesSearch && matchesStatus;
  });
}


  // Export to Excel function (unchanged)
  exportToExcel() {
    const exportData = this.orders.map((order) => ({
      'Order Date': order.orderDate,
      'Order Status': order.orderStatus.replace('_', ' '),
      'Payment Status': order.paymentStatus.replace('_', ' '),
      'Rental Start Date': order.rentalStartDate,
      'Rental End Date': order.rentalEndDate,
      'Total Amount': order.totalAmount,
      'Equipment Name': order.orderEquipmentSet
        .map((equipment: any) => equipment.equipment.name)
        .join(', '),
      'Customer Name': order.customerDetail.fullName,
      'Customer Email': order.customerDetail.emailAddress,
      'Customer Phone': order.customerDetail.mobileNumber,
      'Job Site': `${order.jobSiteDetail.streetAddress}, ${order.jobSiteDetail.jobSiteCity}, ${order.jobSiteDetail.jobSiteState}, ${order.jobSiteDetail.zipCode}`,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, 'orders_data.xlsx');
  }

  // View order in dialog
  viewOrder(order: any) {
    this.selectedOrder = order;
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  deleteOrder(order: any) {
    console.log('Deleting order', order);
  }
}
