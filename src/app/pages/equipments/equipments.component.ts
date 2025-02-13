import { Component } from '@angular/core';
import { EquipmentsService } from '../../services/equipments/equipments.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-equipments',
  standalone: false,

  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {
  equipments: any = [];
  constructor(
    private router: Router,
    private equipmentService: EquipmentsService,
    private snackBar: MatSnackBar
  ) {}

  // Method to add new equipment
  addEquipment() {
    this.router.navigateByUrl('/add-equipment');
  }
  ngOnInit(): void {
    this.loadEquipments();
  }
  loadEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe({
      next: (data) => {
        this.equipments = data;
        console.log('Equipments loaded:', data);
      },
      error: (err) => {
        console.error('Error fetching equipments:', err);
      },
    });
  }
  deleteEquipment(id: number): void {
    console.log(`Delete request for equipment with ID: ${id}`);
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipmentService.deleteEquipment(id).subscribe(
        () => {
          console.log(`Equipment with ID ${id} deleted successfully.`);
          this.equipments = this.equipments.filter(
            (equipment: any) => equipment.id !== id
          );

          // Show success Snackbar
          this.snackBar.open('Equipment deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.loadEquipments()
        },
        (error) => {
          console.error(`Error deleting equipment with ID ${id}:`, error);

          this.snackBar.open('Error deleting equipment!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'], 
          });
          this.loadEquipments()
        }
      );
    }
  }
  navigateToUpdate(equipmentId: string): void {
    this.router.navigate([`/update-equipment/${equipmentId}`]);
  }
}
