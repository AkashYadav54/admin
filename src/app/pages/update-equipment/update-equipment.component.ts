import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentsService } from '../../services/equipments/equipments.service';
import { CategoryService } from '../../services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-equipment',
  standalone: false,
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.scss'],
})
export class UpdateEquipmentComponent {
  equipmentId: any;
  equipmentDetails: any;
  categories: any[] = [];
  updatedEquipment: any = {
    equipmentName: '',
    description: '',
    specifications: '',
    equipmentCategoryId: '',
    equipmentImage: {
      equipmentImage: '',
      thumbnail: '',
      uploadedOn: '',
    },
    equipmentRentalOption: {
      basePrice: 0,
      perWeekPrice: 0,
      perMonthPrice: 0,
      baseFare: 0,
      perKmFare: 0,
    },
    equipmentLocationRequest: {
      address: '',
      city: '',
      state: '',
      zipcode: '',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private equipmentsService: EquipmentsService,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.equipmentId = this.route.snapshot.paramMap.get('id');
    console.log('Equipment ID:', this.equipmentId);
    this.loadEquipmentDetails(this.equipmentId);
    this.loadCategories();
  }

  loadEquipmentDetails(equipmentId: any): void {
    this.equipmentsService.getEquipmentById(equipmentId).subscribe({
      next: (equipment: any) => {
        this.equipmentDetails = equipment;
        console.log('Equipment Details:', this.equipmentDetails);
        this.updatedEquipment = {
          equipmentName: equipment.name,
          description: equipment.description,
          specifications: equipment.specifications,
          equipmentCategoryId: equipment.equipmentCategory.categoryId,
          equipmentImage: {
            equipmentImage: equipment.equipmentImage?.equipmentImage || '',
            thumbnail: equipment.equipmentImage?.equipmentImage || '',
            uploadedOn: equipment.equipmentImage?.uploadedOn || new Date().toISOString(), 
          },
          equipmentRentalOption: equipment.equipmentRentalOption || {
            basePrice: equipment.rentalOption.basePrice,
            perWeekPrice: equipment.rentalOption.perWeekPrice,
            perMonthPrice: 0,
            baseFare: equipment.rentalOption.baseFare,
            perKmFare: equipment.rentalOption.perKmFare,
          },
          equipmentLocationRequest: equipment.equipmentLocationRequest ||{
            locationId: equipment.equipmentLocation?.locationId || '',
            address: equipment.equipmentLocation?.address || '',  
            city: equipment.equipmentLocation?.city || '',
            state: equipment.equipmentLocation?.state || '',
            zipcode: equipment.equipmentLocation?.zipcode || '',
            latitude: equipment.equipmentLocation?.latitude || 28.6139,
            longitude: equipment.equipmentLocation?.longitude || 77.209,
          },
          availableProducts: 'Test Products',
        };
      },
      error: (error: any) => {
        console.error('Error fetching equipment details:', error);
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

  updateEquipment(): void {
    console.log('Updated Equipment:', this.updatedEquipment);
    this.equipmentsService
      .updateEquipment(this.equipmentId, this.updatedEquipment)
      .subscribe({
        next: (response: any) => {
          console.log('Equipment updated successfully');
          this.snackBar.open('Equipment updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/equipments']);
        },
        error: (error: any) => {
          console.error('Error updating equipment:', error);
          this.snackBar.open('Failed to update equipment.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }
}
