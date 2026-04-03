import '@/style.css'
import '../../src/styles/index.sass'
import { VillageEditor } from '../../src'
import {VLECreateMessageText} from '../../src/core/createMessageText'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  const editor = new VillageEditor({
    rootElement: app,
    buttonAdd: {
      isHide: false,
      action: (ctx): void => {
        VLECreateMessageText(ctx)
      }
    }
  })

  console.log(editor)
}
