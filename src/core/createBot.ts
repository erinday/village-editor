import { VLECreateNode } from '../utils/createNode'

export interface VLECreateBotParams {
  text?: string;
  action: () => void;
}

export function vleCreateBot (params: VLECreateBotParams): HTMLDivElement {
  const bot: HTMLDivElement = VLECreateNode<HTMLDivElement>({
    classNames: ['village-editor__bot'],
  })
  const button: HTMLButtonElement = VLECreateNode<HTMLButtonElement>({
    classNames: ['village-editor__bot-button'],
    tag: 'button'
  })
  button.textContent = params.text || 'Добавить параграф'
  button.type = 'button'
  button.addEventListener('click', params.action)
  bot.append(button)
  return bot
}
