import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.nodule';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports : [ 
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule],
    exports : [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
    ]
})
export class SharedModule {}