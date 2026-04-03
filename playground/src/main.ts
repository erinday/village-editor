import '@/style.css'
import '../../src/styles/index.sass'
import { VillageEditor } from '../../src'
import { vleCreateMessageText } from '../../src/core/createMessageText'
import { vleCreateBot } from '../../src/core/createBot'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  const editor = new VillageEditor({
    rootElement: app,
    bot: {
      create: (ctx: VillageEditor): HTMLElement => {
        return vleCreateBot({
          action: (): void => {
            vleCreateMessageText(ctx)
          }
        })
      }
    }
  })

  console.log(editor)
}
