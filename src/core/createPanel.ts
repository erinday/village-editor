import { VLECreateNode } from '../utils/createNode'

export function VLECreatePanel (): HTMLDivElement {
  const panel: HTMLDivElement = VLECreateNode<HTMLDivElement>({
    classNames: ['village-editor__panel']
  })
  const buttonUp: HTMLButtonElement = VLECreateNode<HTMLButtonElement>({
    classNames: ['village-editor__panel', 'village-editor__panel_up'],
    tag: 'button'
  })
  const buttonDown: HTMLButtonElement = VLECreateNode<HTMLButtonElement>({
    classNames: ['village-editor__panel', 'village-editor__panel_down'],
    tag: 'button'
  })
  buttonUp.type = buttonDown.type = 'button'
  buttonUp.textContent = 'Вверх'
  buttonDown.textContent = 'Вниз'
  panel.append(buttonUp, buttonDown)
  // todo buttonUp.addEventListener('click', ...)
  // todo buttonDown.addEventListener('click', ...)
  return panel
}
