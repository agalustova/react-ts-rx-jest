import { useEffect, useState, useRef } from 'react';
import { range, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

export enum SensorLabel {
  NOT_PREPARED = 'NOT_PREPARED',
  NOT_AVAILABLE_LABEL = 'N/A',
}

const {
  floor,
  random,
} = Math;

const RESET_TO_NOT_AVAILABLE_DELAY = 1000; // milliseconds
const MIN_INTERVAL_TIME = 100; // milliseconds
const MAX_INTERVAL_TIME = 2000; // milliseconds

function getRandomInteger(min = 0, max = 0) {
  return floor(min + random() * (max + 1 - min));
}

const getDelayTime = () => getRandomInteger(MIN_INTERVAL_TIME, MAX_INTERVAL_TIME);

function usePeriodicalValue() {
  const [value, setValue] = useState<number | string>(SensorLabel.NOT_PREPARED);
  const timer = useRef<any>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (value !== SensorLabel.NOT_AVAILABLE_LABEL && value !== SensorLabel.NOT_PREPARED) {
      timer.current = setTimeout(() => {
        timer.current = null;
        setValue(SensorLabel.NOT_AVAILABLE_LABEL);
      }, RESET_TO_NOT_AVAILABLE_DELAY);
    }

    return () => clearTimeout(timer.current);
  }, [value]);

  useEffect(() => {
    const obs = range(1, 400).pipe(
      concatMap((i) => of(i).pipe(
        delay(getDelayTime()),
      )),
    ).subscribe(() => {
      setValue(getRandomInteger(60, 70));
    });
    return () => obs.unsubscribe();
  }, []);

  return value;
}

export default usePeriodicalValue;
