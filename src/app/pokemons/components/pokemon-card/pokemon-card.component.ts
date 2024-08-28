import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-blue-500 h44 bg-opacity-25 rounded-lg shadow-md flex flex-col"
    >
      <img
        class="w-24 h-24"
        width="96px"
        height="96px"
        src="https:://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
      />

      <div class="text-center mt-2">
        <div class="text-xl font-bold capitalize text-white"></div>
      </div>
    </div>
  `,
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {}
