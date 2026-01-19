import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Card } from '../../components/card/card';
import { Badge } from '../../components/badge/badge';
import { MatIconModule } from '@angular/material/icon';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe, Card, Badge, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  readonly stats = signal<StatCard[]>([
    {
      title: 'Total Balance',
      value: '$24,563.00',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'account_balance_wallet',
    },
    {
      title: 'Monthly Income',
      value: '$8,420.00',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'trending_up',
    },
    {
      title: 'Monthly Expenses',
      value: '$3,847.00',
      change: '-5.1%',
      changeType: 'negative',
      icon: 'trending_down',
    },
    {
      title: 'Savings Rate',
      value: '54.3%',
      change: '+2.4%',
      changeType: 'positive',
      icon: 'savings',
    },
  ]);

  readonly recentTransactions = signal([
    { name: 'Grocery Store', category: 'Food', amount: -125.50, date: 'Today' },
    { name: 'Salary Deposit', category: 'Income', amount: 4500.00, date: 'Yesterday' },
    { name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: 'Jan 13' },
    { name: 'Electric Bill', category: 'Utilities', amount: -89.00, date: 'Jan 12' },
    { name: 'Freelance Payment', category: 'Income', amount: 850.00, date: 'Jan 10' },
  ]);
}
