import React from 'react';
import clsx from 'clsx';
import { useSensorsData } from 'hooks';
import ParameterRow from 'components/ParameterRow';
import './App.css';

function App(): React.ReactElement {
  const {
    loading,
    temperature,
    pressure,
    humidity,
  } = useSensorsData();

  return (
    <div className="App">
      <header className={clsx('App-header', { 'App--loading': loading })}>
        {loading && (<div>Data will be available when sensors are prepared.</div>)}
        {!loading && (
          <div className="characteristics">
            <ParameterRow title="Temperature :" value={temperature} />
            <ParameterRow title="Air pressure :" value={pressure} />
            <ParameterRow title="Humidity :" value={humidity} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
