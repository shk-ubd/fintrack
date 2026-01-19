import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-container',
  imports: [],
  template: `
    <div [class]="containerClasses()">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .ft-container {
      width: 100%;
      margin: 0 auto;
      padding: 0 var(--ft-spacing-md);
    }

    .ft-container--sm {
      max-width: 640px;
    }

    .ft-container--md {
      max-width: 768px;
    }

    .ft-container--lg {
      max-width: 1024px;
    }

    .ft-container--xl {
      max-width: 1280px;
    }

    .ft-container--full {
      max-width: 100%;
    }

    .ft-container--centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Container {
  readonly size = input<ContainerSize>('lg');
  readonly centered = input<boolean>(false);

  readonly containerClasses = computed(() => {
    const classes = ['ft-container', `ft-container--${this.size()}`];
    
    if (this.centered()) {
      classes.push('ft-container--centered');
    }
    
    return classes.join(' ');
  });
}
