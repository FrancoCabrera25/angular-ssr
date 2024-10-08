import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div class="gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
      <div
        class="bg-white h-44 bg-opacity-25 rounded-lg shadow-md flex flex-col justify-center items-center p-4 cursor-pointer"
      >
        <!-- Imagen del Pokémon -->
        <div class="rounded-full animate-pulse bg-gray-300 w-24 h-24"></div>

        <div class="flex text-center mt-5">
          <div class="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './pokemon-list-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeletonComponent {}
