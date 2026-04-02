import {
  VLEContent, VLEMessage,
  VLEMessageText,
  VLEMessageTypes,
  VLEOptions,
  VLEViews,
} from '../types'

export class VillageEditor {
  readonly #version: number = 1
  #views: VLEViews = this.createViews()
  #list: Array<VLEMessage> = []
  #lastId: number = 0

  constructor (options: VLEOptions) {
    if (!(options.rootElement instanceof HTMLElement)) {
      throw new TypeError(
        `VillageEditor: rootElement must be an instance of HTMLElement,
        received: ${options.rootElement}`
      )
    }
    this.createView(options.rootElement)
  }

  handleGetData = (): void => {
    this.getData()
  }

  handleCreateMessageText = this.createMessageText

  createViews (): VLEViews {
    return {
      main: this.createNode<HTMLDivElement>(['village-editor']),
      content: this.createNode<HTMLDivElement>(['village-editor__content']),
      buttonAdd: this.createButtonAdd()
    }
  }

  createView (rootNode: HTMLElement): void {
    this.#views.content.addEventListener('input', this.handleGetData)
    this.#views.main.append(this.#views.content, this.#views.buttonAdd)
    rootNode.append(this.#views.main)
  }

  writeMessage (message: VLEMessageText): void {
    this.#list.push(message)
    this.#views.content.append(message.view)
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
      const message = this.#list.find((message: VLEMessage) => message.id === id) || null
      if (!message || !message.input.value) continue
      data.data.push({ type: message.type, value: message.input.value})
    }
    console.dir(data)
    return data
  }

  createNode<T extends HTMLElement = HTMLDivElement> (classNames: Array<string>, tag: string = 'div'): T {
    const element: T = document.createElement(tag) as T
    element.classList.add(...classNames)
    return element
  }

  createButtonAdd (): HTMLButtonElement {
    const button: HTMLButtonElement = this.createNode<HTMLButtonElement>(['village-editor__button'], 'button')
    button.textContent = 'Добавить параграф'
    button.type = 'button'
    button.addEventListener('click', () => this.handleCreateMessageText())
    return button
  }

  createMessageText (): VLEMessageText {
    const id: number = this.getNewId()
    const view: HTMLDivElement = this.createNode<HTMLDivElement>(['village-editor__message', 'village-editor__message_text'])
    const panel: HTMLDivElement = this.createPanel()
    const input: HTMLTextAreaElement = this.createNode<HTMLTextAreaElement>(['village-editor__text'], 'textarea')
    view.dataset.id = `${id}`
    input.name = `text-${id}`
    view.append(panel, input)
    const data: VLEMessageText = {
      id,
      type: VLEMessageTypes.TEXT,
      view,
      input,
    }
    this.writeMessage(data)
    return data
  }

  getNewId (): number {
    return ++this.#lastId
  }

  createPanel (): HTMLDivElement {
    const panel: HTMLDivElement = this.createNode<HTMLDivElement>(['village-editor__panel'])
    const buttonUp: HTMLButtonElement = this.createNode<HTMLButtonElement>(['village-editor__panel', 'village-editor__panel_up'], 'button')
    const buttonDown: HTMLButtonElement = this.createNode<HTMLButtonElement>(['village-editor__panel', 'village-editor__panel_down'], 'button')
    buttonUp.type = buttonDown.type = 'button'
    buttonUp.textContent = 'Вверх'
    buttonDown.textContent = 'Вниз'
    panel.append(buttonUp, buttonDown)
    // todo buttonUp.addEventListener('click', ...)
    // todo buttonDown.addEventListener('click', ...)
    return panel
  }

  destroy (): void {
    this.#list = []
    this.#views.main.parentNode?.removeChild(this.#views.main)
    this.#views = this.createViews()
  }
}
