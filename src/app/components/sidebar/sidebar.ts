import { Component, input, output, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Logo } from '../logo/logo';
import { Avatar } from '../avatar/avatar';

export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  badge?: string | number;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatTooltipModule, Logo, Avatar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  // Inputs
  readonly sections = input<SidebarSection[]>([]);
  readonly collapsed = input<boolean>(false);
  readonly userName = input<string>('User');
  readonly userEmail = input<string>('');
  readonly userAvatar = input<string>('');

  // Outputs
  readonly collapsedChange = output<boolean>();
  readonly logout = output<void>();

  // Computed
  readonly sidebarClasses = computed(() => {
    const classes = ['ft-sidebar'];
    if (this.collapsed()) {
      classes.push('ft-sidebar--collapsed');
    }
    return classes.join(' ');
  });

  readonly userInitials = computed(() => {
    const name = this.userName();
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  });

  toggleCollapse(): void {
    this.collapsedChange.emit(!this.collapsed());
  }

  onLogout(): void {
    this.logout.emit();
  }
}
