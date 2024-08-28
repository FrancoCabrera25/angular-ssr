import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [PokemonCardComponent],
  template: `<div class="gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">

   <app-pokemon-card />
   <app-pokemon-card />
   <app-pokemon-card />
   <app-pokemon-card />
   <app-pokemon-card />
   <app-pokemon-card />
   <app-pokemon-card />

  </div>`,
  styleUrl: './pokemons-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent {}
