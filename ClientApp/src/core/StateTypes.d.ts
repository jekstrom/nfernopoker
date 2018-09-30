//TODO: Wire back in?
declare namespace Types {
  type Routing = {
    location: string | null;
  }

  type Message = {
    open: boolean;
    message: string;
  }

  export type Store = {
    snacks: Message;
    routing: Routing;
  }
}
