import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, SidebarSection } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  readonly sidebarCollapsed = signal<boolean>(false);
  readonly userName = signal<string>('John Doe');
  readonly userEmail = signal<string>('john.doe@example.com');

  readonly sidebarSections = signal<SidebarSection[]>([
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'Analytics', icon: 'analytics', route: '/analytics' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { label: 'Transactions', icon: 'receipt_long', route: '/transactions', badge: '12' },
        { label: 'Budgets', icon: 'account_balance_wallet', route: '/budgets' },
        { label: 'Goals', icon: 'flag', route: '/goals' },
        { label: 'Accounts', icon: 'account_balance', route: '/accounts' },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Categories', icon: 'category', route: '/categories' },
        { label: 'Reports', icon: 'assessment', route: '/reports' },
        { label: 'Settings', icon: 'settings', route: '/settings' },
      ],
    },
  ]);

  onSidebarCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);
  }

  onLogout(): void {
    // Handle logout
    console.log('Logout clicked');
  }
}
