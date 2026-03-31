import { VLE } from '../types'
import {getId} from '../utils/getId'
import {createNode} from '../utils/createNode'

export class VillageEditor {
  readonly #rootElement: HTMLElement
  readonly #content: VLE.Content
  #list: Array<VLE.MessageText> = []

  constructor (options: VLE.Options) {
    if (!(options.rootElement instanceof HTMLElement)) {
      throw new TypeError(
        `VillageEditor: rootElement must be an instance of HTMLElement, received: ${options.rootElement}`
      )
    }
    this.#rootElement = options.rootElement
    this.#content = options.content
    this.create()
  }

  writeMessage (message: VLE.MessageText): void {
    this.#list.push(message)
    this.#rootElement.append(message.wrap)
  }

  getData (): void {
    const data = this.#list
    console.dir(data)
  }

  createNode = createNode
  createMessageText (): VLE.MessageText { return createMessageText(this) }

  private create (): void {
    const contElement: HTMLElement = this.createNode('village-editor')
    this.#rootElement.append(contElement)
  }
}

export function createMessage (): HTMLDivElement {
  return createNode('village-editor__item')
}

export function createMessageText (ctx: VillageEditor): VLE.MessageText {
  const id: number = getId()
  const view: HTMLTextAreaElement = ctx.createNode<HTMLTextAreaElement>('village-editor__text', 'textarea')
  view.dataset.id = `${id}`
  view.name = `text-${id}`
  const data: VLE.MessageText = {
    id,
    type: VLE.MessageTypes.TEXT,
    wrap: createMessage(),
    input: view,
    value: null,
    focus () {
      this.input.focus()
    }
  }
  data.wrap.append(data.input)
  ctx.writeMessage(data)
  return data
}
