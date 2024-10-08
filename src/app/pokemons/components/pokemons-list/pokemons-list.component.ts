import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SimplePokemon } from '../../interfaces/pokemons.inferface';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [PokemonCardComponent],
  template: `<div class="gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
    @for ( pokemon of pokemons() ; track pokemon.id ) {
      <app-pokemon-card [pokemon]="pokemon"/>
    }
  </div>`,
  styleUrl: './pokemons-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
