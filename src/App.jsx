import { useState } from 'react';

export function App() {
  const [city, setCity] = useState('');
  const [weatherForecast, setweatherForecast] = useState(null);
  function handleChange(e) {
    setCity(e.target.value);
    console.log(city);
  }

  function handleSearch() {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=f745a7c9c3114847874161805221608&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setweatherForecast(data);
      });
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand">j0tta Weather</a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo d asua cidade!</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em
            pesquisar
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={city}
              />
            </div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={handleSearch}>
            Pesquisar
          </button>

          {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={weatherForecast.current.condition.icon} />
                </div>
                <div>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">
                    Temperatura: {weatherForecast.current.temp_c}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
