import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (pokemon() === null) {
    <div class="flex justify-center">
      <h1 class="text-4xl font-bold">loading...</h1>
    </div>
    }@else { @let myPokemon = pokemon()!;
    <section class="flex flex-col justify-center">
      <div class="flex justify-center">
        <h1 class="text-4xl font-bold capitalize my-5">
          {{ myPokemon.name }}
        </h1>
      </div>
    </section>

    <section class="flex flex-col justify-center items-center w-full">
      <img
        [src]="pokemon()?.sprites?.other?.['official-artwork']?.front_default"
        class="w-64 h-64"
        width="256px"
        height="256px"
      />

      @if (myPokemon.cries.latest !== null) {
      <audio controls class="my-10">
        <source [src]="myPokemon.cries.latest" type="audio/wav" />
      </audio>
      }
    </section>
    <section class="flex flex-col justify-center">
      <h2 class="text-2xl font-bold  mt-2">Abilities</h2>
      <div class="flex flex-wrap items-center">
        @for ( ability of myPokemon.abilities ; track ability.ability) {
        <span> {{ ability.ability.name }}</span>
        }
      </div>
    </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  public pokemon = signal<Pokemon | null>(null);
  public id = this.route.snapshot.paramMap.get('id') ?? '';
  ngOnInit(): void {
    this.pokemonService
      .loadPokemon(this.id)
      .pipe(
        tap((pokemon) => {
          const pageTitle = `#${this.id} - ${pokemon.name}`;
          const pageDescription = `Pagina del pokemon ${pokemon.name}`;
          this.title.setTitle(pageTitle);
          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
          });
        })
      )
      .subscribe({
        next: (pokemon: Pokemon) => {
          this.pokemon.set(pokemon);
        },
      });
  }
}
