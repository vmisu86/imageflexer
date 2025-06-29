import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  standalone: false
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) { }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
}