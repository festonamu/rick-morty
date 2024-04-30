import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../hooks/useFetch';

const mockFetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('mockData') })
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/test-path' })
}));

describe('useFetch', () => {

  beforeEach(() => { global.fetch = mockFetch as any; });
  afterEach(() => { jest.restoreAllMocks(); });

  it('should fetch the data and update the state', async () => {

    const { result } = renderHook(() => useFetch('https://rickandmortyapi.com/api/character'));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBeFalsy());

    expect(result.current.data).toBe('mockData');
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe('');
  });

  it('should handle fetch errors and update the state', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useFetch('https://rickandmortyapi.com/api'));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBeFalsy());

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(typeof (result.current.error)).toBe('string');

  });

  it('should handle URL changes with query parameters and update the state', async () => {
    const { result, rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: 'https://rickandmortyapi.com/api/episodes?page=1' },
    });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBeFalsy());

    expect(result.current.data).toBe('mockData');
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe('');

    // Rerender with a different URL with query parameters
    rerender({ url: 'https://rickandmortyapi.com/api/episodes?page=2' });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBeFalsy());

    expect(result.current.data).toBe('mockData');
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe('');
  });


  // it('should set an error message', async () => {

  //   const { result } = renderHook(() => useFetch('https://rickandmortyapi.com/api/characters'));

  //   expect(result.current.data).toBeNull();
  //   expect(result.current.loading).toBeTruthy();
  //   expect(result.current.error).toBe('');

  //   await waitFor(() => expect(result.current.loading).toBeFalsy());

  //   expect(result.current.data).toBe('mockData');
  //   expect(result.current.loading).toBeFalsy();
  //   expect(typeof(result.current.error)).toBe('string');
  // });
});
