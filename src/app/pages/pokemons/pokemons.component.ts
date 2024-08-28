import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonsListComponent } from '../../pokemons/components/pokemons-list/pokemons-list.component';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonsListComponent],
  template: `<h1 class="text-3xl">Listgado de Pokemons</h1>
    <h2 class="text-xl">Pagina actual</h2>

    <hr />
    <app-pokemons-list />
    <div class="flex justify-between">
      <button class="mt-2"> Anteriores</button>
      <button class="mt-2"> Siguientes</button>
    </div>

    `,
  styleUrl: './pokemons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent {}
