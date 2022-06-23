import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [ChatComponent],
  imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      MomentModule
    ],
})
export class ChatModule {}
