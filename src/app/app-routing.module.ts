import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {component: ChatComponent, path: "chat", canActivate: [AuthGuard]},
  {component: MainComponent, path: "**"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
