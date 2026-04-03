import { Prettify } from '../types'

interface VLECreateNodeParams {
  classNames: Array<string>;
  tag?: 'div' | 'textarea' | 'button' | string;
}

export function VLECreateNode<T extends HTMLElement = HTMLDivElement> (params: VLECreateNodeParams): T {
  const settings: Prettify<Required<VLECreateNodeParams>> = {
    classNames: params.classNames || [],
    tag: params.tag || 'div'
  }
  const element: T = document.createElement(settings.tag) as T
  if (settings.classNames.length) element.classList.add(...settings.classNames)
  return element
}
