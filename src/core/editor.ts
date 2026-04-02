import { VLE } from '../types'
import { getId } from '../utils/getId'

const V = 1

export class VillageEditor {
  #views: VLE.Views = {
    main: this.createNode<HTMLDivElement>('village-editor'),
    content: this.createNode<HTMLDivElement>('village-editor__content'),
    buttonAdd: this.createButtonAdd()
  }
  #list: Array<VLE.MessageText> = []

  constructor (options: VLE.Options) {
    if (!(options.rootElement instanceof HTMLElement)) {
      throw new TypeError(
        `VillageEditor: rootElement must be an instance of HTMLElement, received: ${options.rootElement}`
      )
    }
    this.createView(options.rootElement)
  }

  private createView (rootNode: HTMLElement): void {
    this.#views.content.addEventListener('input', () => {
      this.getData()
    })
    this.#views.main.append(this.#views.content, this.#views.buttonAdd)
    rootNode.append(this.#views.main)
  }

  writeMessage (message: VLE.MessageText): void {
    this.#list.push(message)
    this.#views.content.append(message.wrap)
  }

  getData (): void {
    const data: VLE.Content = {
      v: V,
      data: []
    }
    for(let i = 0, l = this.#views.content.childNodes.length; i < l; i++) {
      const element = this.#views.content.childNodes[i] as HTMLElement
      const id = Number(element.dataset.id) || 0
      if (!id) continue
      const message = this.#list.find((message: VLE.MessageText) => message.id === id) || null
      if (!message || !message.input.value) continue
      data.data.push({ type: message.type, value: message.input.value})
    }
    console.dir(data)
  }

  createNode<T extends HTMLElement = HTMLDivElement> (className: string, tag: string = 'div'): T {
    const element: T = document.createElement(tag) as T
    element.classList.add(className)
    return element
  }

  createMessage (id: number): HTMLDivElement {
    const element = this.createNode('village-editor__item')
    element.dataset.id = `${id}`
    return element
  }

  createButtonAdd (): HTMLButtonElement {
    const button: HTMLButtonElement = this.createNode<HTMLButtonElement>('village-editor__button')
    button.textContent = 'Добавить параграф'
    button.type = 'button'
    button.addEventListener('click', this.createMessageText.bind(this))
    return button
  }

  createMessageText (): VLE.MessageText {
    const id: number = getId()
    const view: HTMLTextAreaElement = this.createNode<HTMLTextAreaElement>('village-editor__text', 'textarea')
    view.dataset.id = `${id}`
    view.name = `text-${id}`
    const data: VLE.MessageText = {
      id,
      type: VLE.MessageTypes.TEXT,
      wrap: this.createMessage(id),
      input: view,
      value: null,
      focus () {
        this.input.focus()
      }
    }
    data.wrap.append(data.input)
    this.writeMessage(data)
    return data
  }
}
