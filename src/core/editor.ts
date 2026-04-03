import { VLEBlock, VLEContent, VLEOptions, VLEViews } from '../types'

export class VillageEditor {
  readonly #version: number = 1
  #views: VLEViews = this.createViews()
  #list: Array<VLEBlock> = []
  #lastId: number = 0

  constructor (options: VLEOptions) {
    if (!(options.rootElement instanceof HTMLElement)) {
      throw new TypeError(
        `VillageEditor: rootElement must be an instance of HTMLElement,
        received: ${options.rootElement}`
      )
    }
    this.#views.content.addEventListener('input', this.handleGetData)
    this.#views.main.append(this.#views.content)
    if (options.bot) {
      const bot: HTMLElement = options.bot.create(this)
      this.#views.main.append(bot)
    }
    options.rootElement.append(this.#views.main)
  }

  handleGetData = (): void => {
    this.getData()
  }

  createViews (): VLEViews {
    return {
      main: this.createNode<HTMLDivElement>(['village-editor']),
      content: this.createNode<HTMLDivElement>(['village-editor__content']),
    }
  }

  appendBlock (block: VLEBlock): void {
    this.#list.push(block)
    this.#views.content.append(block.view)
  }

  getData (): VLEContent {
    const data: VLEContent = {
      v: this.#version,
      data: []
    }
    for(let i = 0, l = this.#views.content.childNodes.length; i < l; i++) {
      const element = this.#views.content.childNodes[i] as HTMLElement
      const id = Number(element.dataset.id) || 0
      if (!id) continue
      const message = this.#list.find((message: VLEBlock) => message.id === id) || null
      if (!message) continue
      const value: string | null = message.getValue()
      if (value) data.data.push({ type: message.type, value })
    }
    return data
  }

  createNode<T extends HTMLElement = HTMLDivElement> (classNames: Array<string>, tag: string = 'div'): T {
    const element: T = document.createElement(tag) as T
    element.classList.add(...classNames)
    return element
  }

  getNewId (): number {
    return ++this.#lastId
  }

  destroy (): void {
    this.#list = []
    this.#views.main.parentNode?.removeChild(this.#views.main)
    this.#views = this.createViews()
  }
}
