import { Link } from 'react-router-dom';

import { PokemonListItem } from '../models/index';

type Props = {
    data: PokemonListItem
}

function Index({ data: { name, url } }: Props) {
  const pokeIndex = url.split('/')[6];
  const getImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`;

  return (
    <Link to={`detail/${name}`} className="link-default">
      <div className="pokemon-card">
        <img src={getImageUrl} alt={name} className="" />
        <p>{name}</p>
      </div>
    </Link>
  );
}

export default Index;
