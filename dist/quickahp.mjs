
import { default as Alpine } from "./alpine.js"
import { marked } from "./marked.esm.js"

class Field {
  static index = 0
  title = ""
  text = ""
  constructor() {
    this.id = Field.index++
  }
}

Alpine.data('ahp',() => ({

  context: {},
  fields: [],

  addField() {
    this.fields.push(new Field())
  },

  deleteField(id) {
    this.fields = this.fields.filter((f) => f.id != id)
  },

  formatMarkdown(text) {
    return marked(text, { gfm:true })
  },

  async init() {
    this.context = await fetch("https://quickahp.pages.dev/api/context").then(r => r.json())
  }

}))

Alpine.start()
