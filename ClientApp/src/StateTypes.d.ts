declare namespace Types {
  type Routing = {
    location: string | null;
  }

  type Counter = {
    count: number;
    increment: any;
    decrement: any;
  }

  type Message = {
    open: boolean;
    message: string;
  }

  export type Store = {
    counter: Counter;
    snack: Message;
    routing: Routing;
  }
}
