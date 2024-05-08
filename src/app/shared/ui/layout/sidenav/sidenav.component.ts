import { Component } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

const material = [
  MatSidenavModule,
  MatListModule,
  MatIconModule,
];

const core = [
  RouterLink
]

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    material,
    core,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {}
