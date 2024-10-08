import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  SimplePokemon,
  PokemonResponse,
} from '../interfaces/pokemons.inferface';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokemonResponse>(`${this.BASE_URL}?limit=20&offset=${page * 20}`)
      .pipe(
        map((response) => {
          const simplePokemons = response.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
          return simplePokemons;
        })
      );
  }

  public loadPokemon(id: string) {
    return this.http.get<Pokemon>(`${this.BASE_URL}/${id}`);
  }
}
