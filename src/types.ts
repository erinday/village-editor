export enum VLEMessageTypes {
  TEXT = 'text',
  TITLE = 'title'
}

export interface VLEOptions {
  rootElement: HTMLElement;
  content?: VLEContent;
}

export interface VLEViews {
  main: HTMLDivElement;
  content: HTMLDivElement;
  buttonAdd: HTMLButtonElement;
}

export interface VLEContent {
  v: number;
  data: Array<{
    type: VLEMessageTypes;
    value: string;
  }>;
}

export type VLEMessage = VLEMessageText | VLEMessageTitle

export interface VLEMessageTitle {
  type: VLEMessageTypes.TITLE;
  id: number;
  view: HTMLElement;
  input: HTMLTextAreaElement;
}

export interface VLEMessageText {
  type: VLEMessageTypes.TEXT;
  id: number;
  view: HTMLDivElement;
  input: HTMLTextAreaElement;
}
