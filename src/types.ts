import { VillageEditor } from './core/editor'

export type Prettify<T> = { [K in keyof T]: T[K]; } & {}
export type Modify<T, R> = Prettify<Omit<T, keyof R> & R>

export enum VLEBlockTypes {
  TEXT = 'text',
  TITLE = 'title'
}

export interface VLEOptions {
  rootElement: HTMLElement;
  content?: VLEContent;
  bot?: {
    create: (ctx: VillageEditor) => HTMLElement;
  };
}

export interface VLEViews {
  main: HTMLDivElement;
  content: HTMLDivElement;
}

export interface VLEContent {
  v: number;
  data: Array<{
    type: VLEBlockTypes;
    value: string;
  }>;
}

export type VLEBlock = VLEBlockText | VLEBlockTitle

export interface VLEBlockTitle {
  type: VLEBlockTypes.TITLE;
  id: number;
  view: HTMLElement;
  getValue: () => string | null;
}

export interface VLEBlockText {
  type: VLEBlockTypes.TEXT;
  id: number;
  view: HTMLDivElement;
  getValue: () => string | null;
}
