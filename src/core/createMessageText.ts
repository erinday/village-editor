import { VillageEditor } from './editor'
import { VLECreateNode } from '../utils/createNode'
import { VLECreatePanel } from './createPanel'
import { VLEBlockText, VLEBlockTypes } from '../types'

export function vleCreateMessageText (ctx: VillageEditor): VLEBlockText {
  const id: number = ctx.getNewId()
  const view: HTMLDivElement = VLECreateNode<HTMLDivElement>({
    classNames: ['village-editor__message', 'village-editor__message_text']
  })
  const panel: HTMLDivElement = VLECreatePanel()
  const input: HTMLTextAreaElement = VLECreateNode<HTMLTextAreaElement>({
    classNames: ['village-editor__text'],
    tag: 'textarea'
  })
  view.dataset.id = `${id}`
  input.name = `id-${id}`
  view.append(panel, input)
  const data: VLEBlockText = {
    id,
    type: VLEBlockTypes.TEXT,
    view,
    getValue (): string | null {
      return input.value || null
    }
  }
  ctx.appendBlock(data)
  return data
}
