import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonsListComponent } from '../../pokemons/components/pokemons-list/pokemons-list.component';
import { PokemonListSkeletonComponent } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { sign } from 'crypto';
import { SimplePokemon } from '../../pokemons/interfaces/pokemons.inferface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonsListComponent, PokemonListSkeletonComponent, RouterLink],
  template: `<h1 class="text-3xl">Listgado de Pokemons</h1>
    <h2 class="text-xl">Pagina actual {{ currentPage() }}</h2>

    <hr />

    @if (pokemons()) {
    <app-pokemons-list [pokemons]="pokemons()" />
    } @else {
    <app-pokemon-list-skeleton />
    }
    <!--
    <div class="flex justify-between">
      <button class="mt-2" (click)="loadPokemons(-1)">Anteriores</button>
      <button class="mt-2" (click)="loadPokemons(+1)">Siguientes</button>
    </div>
     -->
    <div class="flex justify-between">
      <button
        class="mt-2"
        [disabled]="currentPage() === 1"
        [routerLink]="['/pokemons/page', currentPage()! - 1]"
      >
        Anteriores
      </button>
      <button
        class="mt-2"
        [routerLink]="['/pokemons/page', currentPage()! + 1]"
      >
        Siguientes
      </button>
    </div> `,
  styleUrl: './pokemons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent {
  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(istabler => {

  // })
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private title = inject(Title);
  public pokemons = signal<SimplePokemon[]>([]);

  // public currentPage = toSignal<number>(
  //   this.route.queryParamMap.pipe(
  //     map((params) => params.get('page') ?? '1'),
  //     map((page) => (isNaN(+page) ? 1 : +page)),
  //     map((page) => Math.max(1, page))
  //   )
  // );
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  public loadOnPageChanged = effect(  () => {

    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true
  })
  // ngOnInit(): void {
  //   this.loadPokemons();
  // }

  public loadPokemons(page = 0): void {
    const pageToload = this.currentPage()! + page;

    this.pokemonService
      .loadPage(pageToload)
      .pipe(
        // tap(() =>
        //   this.router.navigate([], { queryParams: { page: pageToload } })
        // ),
        tap((page) => this.title.setTitle(`Pokemons SSR Page - ${pageToload}`))
      )
      .subscribe({
        next: (pokemons) => {
          this.pokemons.set(pokemons);
        },
      });
  }
}
