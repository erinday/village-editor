import '@/style.css';
import { VillageEditor } from '../../src';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  const editor = new VillageEditor({
    placeholder: 'Start typing...',
  });

  app.innerHTML = `
    <div class="playground-card">
      <h1>Village Editor Playground</h1>
      <pre>${JSON.stringify(editor.getOptions(), null, 2)}</pre>
    </div>
  `;

  console.log(editor);
}
