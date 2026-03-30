import '@/style.css'
import { VillageEditor } from '../../src'

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  const editor = new VillageEditor({
    rootElement: app
  })

  console.log(editor);
}
