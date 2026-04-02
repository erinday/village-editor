export namespace VLE {
  export enum MessageTypes {
    'TEXT' = 'text',
  }

  export interface Options {
    rootElement: HTMLElement;
    content: Content;
  }

  export interface Views {
    main: HTMLDivElement;
    content: HTMLDivElement;
    buttonAdd: HTMLButtonElement;
  }

  export interface Content {
    v: number;
    data: Array<{
      type: MessageTypes;
      value: string;
    }>;
  }

  export interface MessageText {
    type: MessageTypes.TEXT;
    id: number;
    wrap: HTMLElement;
    input: HTMLTextAreaElement;
    value: string | null;
    focus (): void;
  }
}
