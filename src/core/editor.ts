import { VLE } from '../types'
import { getId } from '../utils/getId'

export class VillageEditor {
  readonly #rootElement: HTMLElement
  // readonly #content: VLE.Content
  readonly #buttonAdd: HTMLButtonElement
  #list: Array<VLE.MessageText> = []

  constructor (options: VLE.Options) {
    if (!(options.rootElement instanceof HTMLElement)) {
      throw new TypeError(
        `VillageEditor: rootElement must be an instance of HTMLElement, received: ${options.rootElement}`
      )
    }
    this.#buttonAdd = this.createButtonAdd()
    this.#rootElement = options.rootElement
    // this.#content = options.content
    this.#rootElement.append(this.#buttonAdd)
    this.create()
  }

  writeMessage (message: VLE.MessageText): void {
    this.#list.push(message)
    this.#buttonAdd.before(message.wrap)
  }

  getData (): void {
    const data = this.#list
    console.dir(data)
  }

  createNode<T extends HTMLElement = HTMLDivElement> (className: string, tag: string = 'div'): T {
    const element: T = document.createElement(tag) as T
    element.classList.add(className)
    return element
  }

  createMessage (): HTMLDivElement {
    return this.createNode('village-editor__item')
  }

  private create (): void {
    const contElement: HTMLElement = this.createNode('village-editor')
    this.#rootElement.append(contElement)
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
      wrap: this.createMessage(),
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
