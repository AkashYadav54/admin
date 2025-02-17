import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  newCategory: any = {}; 

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar,
    private router:Router
  ) {
    this.resetCategory();
  }

  private resetCategory(): void {
    this.newCategory = { categoryName: '', categoryImage: '' };
  }

  addCategory(event: Event): void {
    event.preventDefault();
    console.log(this.newCategory);

    if (!this.newCategory.categoryName || !this.newCategory.categoryImage) {
      alert('Please enter category name and image URL.');
      return;
    }

    // Call the service to add the category
    this.categoryService.addCategory(this.newCategory).subscribe({
      next: (response) => {
        console.log('Category added:', response);
        
        // Show success Snackbar
        this.snackBar.open('Category added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'], // Optional: Custom success style
        });
        this.router.navigateByUrl('/category');
        this.resetCategory(); // Reset after successful submission
      },
      error: (err) => {
        console.error('Error adding category:', err);
        
        // Show error Snackbar
        this.snackBar.open('Error adding category!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'], // Optional: Custom error style
        });
      },
    });
  }
  back(){
    this.router.navigate(['/category']);
  }
}
