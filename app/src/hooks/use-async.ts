import React from 'react'

export function useSafeDispatch<Value = unknown>(
  dispatch: React.Dispatch<Value>
) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (value: Value) => (mounted.current ? dispatch(value) : void 0),
    [dispatch]
  )
}

export enum ApiStatus {
  Idle = 'idle',
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

interface AsyncState<Data = unknown> {
  data?: Data
  error?: string
  status: ApiStatus
}

/** Example usage:
 ```ts
 const {data, error, status, isLoading, run} = useAsync()
 React.useEffect(() => {
   run(fetchPokemon(pokemonName))
 }, [pokemonName, run])
 ```
 **/
export function useAsync<Result = unknown>(
  initialState: AsyncState<Result> = {
    status: ApiStatus.Idle,
    data: undefined,
    error: undefined,
  }
) {
  const initialStateRef = React.useRef({
    ...initialState,
  })
  const [{status, data, error}, setState] = React.useReducer(
    (s: AsyncState<Result>, a: AsyncState<Result>) => ({...s, ...a}),
    initialStateRef.current
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (data: Result) => safeSetState({data, status: ApiStatus.Resolved}),
    [safeSetState]
  )
  const setError = React.useCallback(
    (error: string) =>
      safeSetState({
        error: JSON.stringify(error),
        status: ApiStatus.Rejected,
      }),
    [safeSetState]
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  )

  const run = React.useCallback(
    (promise: Promise<Result>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `
The
argument
passed
to
useAsync().run
must
be
a
promise.Maybe
a

function that

's passed isn'
t
returning
anything ? `
        )
      }
      safeSetState({status: ApiStatus.Pending})
      return promise.then(
        (data) => {
          setData(data)
          return data
        },
        (error: string) => {
          setError(error)
          throw Promise.reject(error)
        }
      )
    },
    [safeSetState, setData, setError]
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === ApiStatus.Idle,
    isLoading: status === ApiStatus.Pending,
    isError: status === ApiStatus.Rejected,
    isSuccess: status === ApiStatus.Resolved,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}
