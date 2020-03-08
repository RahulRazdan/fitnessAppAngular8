import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule(
    {
        imports:[
            MatButtonModule,
            MatTableModule,
            MatDialogModule,
            MatIconModule,
            MatSidenavModule,
            MatToolbarModule,
            MatSelectModule,
            MatListModule,
            MatCardModule,
            MatTabsModule,
            MatSortModule,
            MatProgressSpinnerModule,
            MatInputModule,
            MatPaginatorModule,
            FlexLayoutModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatSnackBarModule,
            MatCheckboxModule],
        exports :[
            MatButtonModule,
            MatTableModule,
            MatSnackBarModule,
            MatCardModule,
            MatSortModule,
            MatPaginatorModule,
            MatDialogModule,
            MatProgressSpinnerModule,
            MatSelectModule,
            MatIconModule,
            MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatTabsModule,
            MatInputModule,FlexLayoutModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule]
    }
)
export class MaterialModule {}