export class CountTypes {
  public static readonly IncrementCountType = 'INCREMENT_COUNTER';
  public static readonly ResetCounterType = 'RESET_COUNTER';
  public static readonly DecrementCountType = 'DECREMENT_COUNT';
}

export type Action = {
  type: "INCREMENT_COUNTER",
  delta: number,
} | {
    type: "RESET_COUNTER",
  }

export const incrementCounter = (delta: number): Action => ({
  type: CountTypes.IncrementCountType,
  delta,
})

export const resetCounter = (): Action => ({
  type: CountTypes.ResetCounterType,
})
