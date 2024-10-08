import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemons.inferface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="bg-blue-500 animate-fadeIn h-44 bg-opacity-25 rounded-lg shadow-md flex flex-col p-4 items-center justify-center cursor-pointer"
      [routerLink]="['/pokemon', pokemon().name]"
    >
      <img
        [src]="pokemonImage()"
        [alt]="pokemon().name"
        class="w-24 h-24"
        width="96px"
        height="96px"
      />

      <div class="text-center mt-2">
        <h2 class="text-xl font-bold capitalize text-white">
          {{ pokemon().name }}
        </h2>
      </div>
    </div>
  `,
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();
  public pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        this.pokemon().id
      }.png`
  );
}
