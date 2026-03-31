import '@/style.css'
import '../../src/styles/index.sass'
import { VillageEditor } from '../../src'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  const button = document.querySelector<HTMLButtonElement>('#button')

  const editor = new VillageEditor({
    rootElement: app,
    content: {
      v: 1,
      data: [
        'ssss132',
        'ss2',
      ]
    }
  })

  button?.addEventListener('click', () => {
    editor.createMessageText().focus()
  })

  console.log(editor)
}
