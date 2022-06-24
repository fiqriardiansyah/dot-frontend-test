import { useNavigate } from 'react-router-dom';

const USER = 'user';

function Index() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem(USER);
    navigate('/auth');
  };

  return (
    <nav>
      <div className="container">
        <div className="nav-container">
          <p className="title">Pokemon</p>
          <button onClick={logoutHandler} className="button-primary" type="button">
            logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Index;
