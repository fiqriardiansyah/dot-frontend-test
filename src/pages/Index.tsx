import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'rsuite';
import { useMutation } from 'react-query';
import Api from '../config/apis';

/// models
import { GetPokemonsResponse } from '../models/index';

// components
import PokemonCard from '../components/PokemonCard';
import Error from '../components/Error';
import Nav from '../components/Nav';

// images
import ListImage from '../assets/list.png';
import GridImage from '../assets/grid.png';

const USER = 'user';

function Index() {
  const navigate = useNavigate();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const pokemonMutation = useMutation(async (url: string | null) => {
    const req = await Api.get<GetPokemonsResponse>({ url: url || '/pokemon' });
    return req.data;
  });

  const nextHandler = () => {
    if (pokemonMutation.data?.next) {
      pokemonMutation.mutate(pokemonMutation.data?.next);
    }
  };

  const prevHandler = () => {
    if (pokemonMutation.data?.previous) {
      pokemonMutation.mutate(pokemonMutation.data?.previous);
    }
  };

  useEffect(() => {
    pokemonMutation.mutate(null);
    const alreadySign = localStorage.getItem(USER);
    if (!alreadySign) navigate('/auth');
  }, []);

  if (pokemonMutation.isError) {
    return <Error message={`${pokemonMutation.error}`} />;
  }

  if (pokemonMutation.isLoading) {
    return <Loader size="lg" content="Loading..." vertical className="loader" />;
  }

  return (
    <>
      <Nav />
      <div className="container mt-10 mb-10">
        <div className="layout-buttons mb-2">
          <button onClick={() => setLayout('grid')} type="button" className="button-layout mr-2">
            <img src={GridImage} className="w-full" alt="" />
          </button>
          <button onClick={() => setLayout('list')} type="button" className="button-layout">
            <img src={ListImage} className="w-full" alt="" />
          </button>
        </div>
        {layout === 'grid' ? (
          <div className="pokemon-container-grid">
            {pokemonMutation.data?.results?.map((el, i) => <PokemonCard key={el.name} data={el} />)}
          </div>
        ) : (
          <div className="pokemon-container-list">
            {pokemonMutation.data?.results?.map((el, i) => (
              <>
                <PokemonCard key={el.name} data={el} />
                <div className="mb-2" />
              </>
            ))}
          </div>
        )}
        <div className="paging mt-5">
          {pokemonMutation.data?.previous && (
          <button onClick={prevHandler} className="button-primary" type="button">
            prev
          </button>
          )}
          {pokemonMutation.data?.next && (
          <button onClick={nextHandler} className="button-primary" type="button">
            next
          </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
