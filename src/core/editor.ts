import type { VillageEditorOptions } from '../types';

export class VillageEditor {
  private options: VillageEditorOptions;

  constructor(options: VillageEditorOptions = {}) {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }
}
