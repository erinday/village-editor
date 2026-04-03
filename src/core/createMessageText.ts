import {VillageEditor} from './editor'
import {VLEMessageText, VLEMessageTypes} from '../types'
import {VLECreateNode} from '../utils/createNode'


export function VLECreateMessageText (ctx: VillageEditor): VLEMessageText {
  const id: number = ctx.getNewId()
  const view: HTMLDivElement = VLECreateNode<HTMLDivElement>({
    classNames: ['village-editor__message', 'village-editor__message_text']
  })
  // const panel: HTMLDivElement = this.createPanel()
  const input: HTMLTextAreaElement = VLECreateNode<HTMLTextAreaElement>({
    classNames: ['village-editor__text'],
    tag: 'textarea'
  })
  view.dataset.id = `${id}`
  input.name = `id-${id}`
  view.append(input)
  const data: VLEMessageText = {
    id,
    type: VLEMessageTypes.TEXT,
    view,
    input,
  }
  ctx.writeMessage(data)
  return data
}
