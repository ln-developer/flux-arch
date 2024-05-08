import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TuiMobileCalendarDialogModule } from '@taiga-ui/addon-mobile';
import { TuiRootModule, TuiDialogModule } from '@taiga-ui/core';

import { HeaderComponent, SidenavComponent } from '@shared/layout';

const layout = [
  HeaderComponent,
  SidenavComponent,
]

const tui = [
  TuiRootModule,
  TuiDialogModule,
  TuiMobileCalendarDialogModule,
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    layout,
    tui,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flux-arch';
}
