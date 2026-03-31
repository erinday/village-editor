export namespace VLE {
  export enum MessageTypes {
    'TEXT' = 'text',
  }

  export interface Options {
    rootElement: HTMLElement;
    content: Content;
  }

  export interface Content {
    v: number;
    data: Array<string>;
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
