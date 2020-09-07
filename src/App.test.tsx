import React from 'react';
// import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import ParameterRow from 'components/ParameterRow';

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useSensorsData } from 'hooks';
import App from './App';

import usePeriodicalValue, { SensorLabel } from './hooks/usePeriodicalValue';

Enzyme.configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Data will be available when sensors are prepared./i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('ParameterRow', () => {
  it('shallow ParameterRow Temperature component', () => {
    const myComponent = shallow(<ParameterRow title="Temperature :" value={68} />);
    expect(myComponent.find('div')).toHaveLength(3);
  });
  it('shallow ParameterRow Air component', () => {
    const myComponent = shallow(<ParameterRow title="Air pressure :" value={68} />);
    expect(myComponent.find('div')).toHaveLength(3);
  });
  it('shallow ParameterRow Humidity component', () => {
    const myComponent = shallow(<ParameterRow title="Humidity :" value={68} />);
    expect(myComponent.find('div')).toHaveLength(3);
  });
  it('renders properly', () => {
    const myComponent = shallow(<ParameterRow title="Humidity :" value={68} />);
    expect(myComponent).toMatchSnapshot();
  });
});
describe('App', () => {
  it('shallow App component', () => {
    const myComponent = shallow(<App />);
    expect(myComponent.find('div')).toHaveLength(2);
  });
  it('renders properly', () => {
    const myComponent = shallow(<App />);
    expect(myComponent).toMatchSnapshot();
  });
});

describe('get param initial value', () => {
  it('initial value', () => {
    const { result } = renderHook(() => usePeriodicalValue());

    expect(result.current).toBe('NOT_PREPARED');
  });
});
describe('get param value after 3 sec', () => {
  it('initial value', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePeriodicalValue());
    expect(result.current).toBe('NOT_PREPARED');
    await waitForNextUpdate();
    expect(result.current).toBeTruthy();
  });
});

describe('get all param initial value', () => {
  it('initial object value', () => {
    const { result } = renderHook(() => useSensorsData());
    const expectedResult = {
      humidity: 'NOT_PREPARED',
      loading: true,
      pressure: 'NOT_PREPARED',
      temperature: 'NOT_PREPARED',
    };
    expect(result.current).toStrictEqual(expectedResult);
  });
});
