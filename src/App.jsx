import { useState, React } from 'react';

export function App() {
  const [city, setCity] = useState('');
  const [weatherForecast, setweatherForecast] = useState(null);

  function handleChange(e) {
    setCity(e.target.value);
  }

  function handleSearch() {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=f745a7c9c3114847874161805221608&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (city === '' || response.status !== 200) {
          alert('Insira uma cidade válida');
          setCity('');
        }
      })
      .then((data) => {
        setweatherForecast(data);
      })
      .catch((error) => {});
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand">j0tta Weather</a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo da sua cidade!</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em
            pesquisar.
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
                <div className=" d-flex flex-column align-items-center">
                  <img
                    src={weatherForecast.current.condition.icon}
                    width="100px"
                  />
                  <p className="lead">
                    {weatherForecast.current.condition.text}
                  </p>
                </div>
                <div>
                  <div className=" d-flex align-items-center">
                    <h1>{weatherForecast.current.temp_c}</h1>
                    <p>ºC</p>
                  </div>
                  <div className="align-items-center">
                    <p className="lead">
                      {weatherForecast.location.name} |{' '}
                      {weatherForecast.location.region}
                    </p>
                    <p className="lead">{weatherForecast.location.localtime}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
