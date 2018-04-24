declare namespace Types {
  type Routing = {
    location: string | null;
  }

  type Counter = {
    count: number;
    increment: any;
    decrement: any;
  }

  export type Store = {
    counter: Counter,
    routing: Routing;
  }
}