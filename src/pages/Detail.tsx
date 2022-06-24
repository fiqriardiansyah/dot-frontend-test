/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Api from '../config/apis';

/// models
import { Pokemon } from '../models/index';

// components
import Error from '../components/Error';
import Nav from '../components/Nav';

const USER = 'user';

function Index() {
  const { name } = useParams();
  const navigate = useNavigate();

  const pokemonQuery = useQuery([name], async () => {
    const req = await Api.get<Pokemon>({ url: `/pokemon/${name}` });
    return req.data;
  }, {
    enabled: !!name,
  });

  const getImage = () => {
    if (!pokemonQuery.data?.forms) return '';
    const pokeIndex = pokemonQuery.data?.forms[0].url.split('/')[6];
    const getImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`;
    return getImageUrl;
  };

  useEffect(() => {
    const alreadySign = localStorage.getItem(USER);
    if (!alreadySign) navigate('/auth');
  }, []);

  if (pokemonQuery.isError) {
    return <Error message={`${pokemonQuery.error}`} />;
  }

  if (pokemonQuery.isLoading) {
    return <Loader size="lg" content={`Getting ${name}...`} vertical className="loader" />;
  }

  return (
    <>
      <Nav />
      <div className="container mt-10 mb-10">
        <button onClick={() => navigate('/')} className="button-primary mb-5" type="button">
          back
        </button>
        <div className="pokemon-detail-container">
          <div className="header">
            <img src={getImage()} alt={pokemonQuery.data?.name} className="image w-20" />
            <h1 className="title">{name}</h1>
            <div className="experience">
              <div className="progress" style={{ width: `${pokemonQuery.data?.base_experience}%`, backgroundColor: 'rgb(255, 231, 20)' }} />
            </div>
          </div>
          <div className="body">
            <div className="abilities">
              <h2 className="title">Abilities</h2>
              <div className="list">
                {pokemonQuery.data?.abilities.map((el, i) => <p key={i.toString()}>{el.ability.name}</p>)}
              </div>
            </div>
            <div className="height">
              <h2 className="title">Height</h2>
              <p>{`${pokemonQuery.data?.height} m`}</p>
            </div>
            <div className="stats">
              <h2 className="title">Stats</h2>
              <div className="list">
                {pokemonQuery.data?.stats.map((el, i) => (
                  <>
                    <p>{el.stat.name}</p>
                    <div key={i.toString()} className="experience">
                      <div className="progress" style={{ width: `${el.base_stat}%`, backgroundColor: 'rgb(105 233 0)' }} />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
