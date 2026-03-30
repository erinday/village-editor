import { VillageEditorOptions } from '../types'

export class VillageEditor {
  readonly #options: VillageEditorOptions

  constructor(options: VillageEditorOptions) {
    if (!(options.rootElement instanceof HTMLElement)) {
      throw new TypeError(
        `VillageEditor: rootElement must be an instance of HTMLElement, received: ${options.rootElement}`
      )
    }
    this.#options = { ...options }
    this.create()
  }

  create (): void {
    const contElement: HTMLElement = this.createElement('village-editor')
    contElement.textContent = 'eeeeeeeeeeeeeee'
    this.#options.rootElement.append(contElement)
  }

  private createElement (className: string, tag: string = 'div'): HTMLElement {
    const element: HTMLElement = document.createElement(tag)
    element.classList.add(className)
    return element
  }
}
