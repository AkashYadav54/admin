import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-category',
  standalone: false,
  
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories: any[] = [];
  constructor( private categoryService: CategoryService,
    private router:Router,
    private snackBar: MatSnackBar
  ){

  }



  ngOnInit(): void {
    this.loadCategories()
    
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
  deleteCategory(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this category?');

    if (confirmation) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          // Show success Snackbar
          this.snackBar.open('Category deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'], // Apply custom styling
          });
          this.loadCategories(); // Refresh categories list
        },
        error: (err) => {
          // Show error Snackbar
          this.snackBar.open('Error deleting category!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'], // Apply custom styling
          });
          console.error('Error deleting category:', err);
        }
      });
    }
  }



  addCategory(){
    this.router.navigateByUrl('/add-category');
  }
}
