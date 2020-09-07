import { useEffect, useState } from 'react';
import usePeriodicalValue, { SensorLabel } from './usePeriodicalValue';

interface SensorsDataProps {
  loading: boolean;
  temperature: string | number;
  pressure: string | number;
  humidity: string | number;
}

// from REQUIREMENTS:
// All 3 systems must emit at least one value before 1 display object is ever sent to the dashboard.
function useSensorsData(): SensorsDataProps {
  const [allReady, setAllReady] = useState(false);
  const temperature = usePeriodicalValue();
  const pressure = usePeriodicalValue();
  const humidity = usePeriodicalValue();

  useEffect(() => {
    if (
      !allReady
      && temperature !== SensorLabel.NOT_PREPARED
      && pressure !== SensorLabel.NOT_PREPARED
      && humidity !== SensorLabel.NOT_PREPARED
    ) {
      setAllReady(true);
    }
  }, [temperature, pressure, humidity, allReady]);

  return {
    loading: !allReady,
    temperature,
    pressure,
    humidity,
  };
}

export default useSensorsData;
