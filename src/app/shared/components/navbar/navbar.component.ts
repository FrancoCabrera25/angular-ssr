import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      class="text-white top-0 gap-4 absolute z-50 w-full flex justify-end px-2 py-3 bg-slate-900 shadow-md"
    > <a class="hover:underline" routerLink="/pokemons" routerLinkActive="text-blue-500 underline">Pokemons </a>
      <a class="hover:underline" routerLink="/about" routerLinkActive="text-blue-500 underline">About </a>
      <a class="hover:underline" routerLink="/pricing" routerLinkActive="text-blue-500 underline">Pricing </a>
      <a class="hover:underline" routerLink="/contact" routerLinkActive="text-blue-500 underline">Contact </a>
    </nav>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
