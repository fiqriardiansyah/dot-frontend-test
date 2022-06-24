export type User = {
    username: string,
    password: string
}

export type PokemonListItem = {
    name: string,
    url: string
}

export type GetPokemonsResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokemonListItem[]
}

export interface Ability2 {
    name: string;
    url: string;
}

export interface Ability {
    ability: Ability2;
    is_hidden: boolean;
    slot: number;
}

export interface Form {
    name: string;
    url: string;
}

export interface Species {
    name: string;
    url: string;
}

export interface Stat2 {
    name: string;
    url: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: Stat2;
}

export interface Type2 {
    name: string;
    url: string;
}

export interface Type {
    slot: number;
    type: Type2;
}

export type Pokemon = {
    abilities: Ability[];
    base_experience: number;
    forms: Form[];
    height: number;
    name: string;
    stats: Stat[];
    types: Type[];
    weight: number;
}
