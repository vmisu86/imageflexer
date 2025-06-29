import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LayoutModule } from './layout/layout.module';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, // Make sure standalone is set to true
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    LayoutModule,
    RouterOutlet
  ],
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'imageflexer';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    // Initialize theme
    this.themeService.darkMode$.subscribe(isDarkMode => {
      if (isDarkMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }
}