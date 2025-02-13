import { Component } from '@angular/core';
import { EquipmentsService } from '../../services/equipments/equipments.service';
import { CategoryService } from '../../services/category/category.service';
import { PartnerService } from '../../services/partner/partner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-equipment',
  standalone: false,

  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.scss',
})
export class AddEquipmentComponent {
  partners: any[] = [];
  equipmentName: string = '';
  equipmentDescription: string = '';
  equipmentRentalOption = {
    basePrice: 0,
    perWeekPrice: 0,
    perMonthPrice: 0,
    baseFare: 0,
    perKmFare: 0,
  };
  equipmentImage: string = '';
  equipmentPartnerId!: number;
  equipmentCategoryId: string = '';
  equipmentTypeId: string = '';
  equipmentLocation: any = {
    address: '',
    city: '',
    state: '',
    zipcode: '',
  };
  categories: any[] = [];

  constructor(
    private equipmentsService: EquipmentsService,
    private categoryService: CategoryService,
    private partnerService: PartnerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getPartners().subscribe({
      next: (data: any) => {
        this.partners = data;
        console.log('Partners:', this.partners);
      },
      error: (err: any) => {
        console.error('Error fetching partners:', err);
      },
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  addEquipment() {
    const equipmentData = {
      equipmentName: this.equipmentName,
      description: this.equipmentDescription,
      specifications: this.equipmentDescription,
      partnerId: this.equipmentPartnerId || '12345',
      equipmentCategoryId: this.equipmentCategoryId,
      equipmentImage: {
        equipmentImage:
          this.equipmentImage || 'https://example.com/equipment.jpg',
        thumbnail:
          this.equipmentImage || 'https://example.com/equipment-thumbnail.jpg',
        uploadedOn: new Date().toISOString(),
      },
      equipmentRentalOption: {
        basePrice: this.equipmentRentalOption.basePrice,
        perWeekPrice: this.equipmentRentalOption.perWeekPrice,
        perMonthPrice: this.equipmentRentalOption.perMonthPrice,
        baseFare: this.equipmentRentalOption.baseFare,
        perKmFare: this.equipmentRentalOption.perKmFare,
      },
      equipmentLocationRequest: {
        address: this.equipmentLocation.address || '123 Test Street',
        city: this.equipmentLocation.city || 'Test City',
        state: this.equipmentLocation.state || 'Test State',
        zipcode: this.equipmentLocation.zipcode || '123456',
        latitude: 28.6139,
        longitude: 77.209,
      },
      availableProducts: 'Test Products',
    };

    console.log('Adding equipment', equipmentData);

    this.equipmentsService.addEquipment(equipmentData).subscribe({
      next: (response) => {
        console.log('Equipment added successfully:', response);
        this.snackBar.open('Equipment deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/equipments']);
      },
      error: (error) => {
        console.error('Error adding equipment:', error);
      },
    });

    this.resetForm();
  }

  resetForm() {
    this.equipmentName = '';
    this.equipmentDescription = '';
    this.equipmentRentalOption = {
      basePrice: 0,
      perWeekPrice: 0,
      perMonthPrice: 0,
      baseFare: 0,
      perKmFare: 0,
    };
    this.equipmentImage = '';
    this.equipmentCategoryId = '';
    this.equipmentTypeId = '';
    this.equipmentLocation = {
      address: '',
      city: '',
      state: '',
      zipcode: '',
    };
  }
}
