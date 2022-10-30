
import { default as Alpine } from "./alpine.js"
import { marked } from "./marked.esm.js"

class Field {

  static index = 0

  title = ""
  text = ""
  preview = false

  constructor() {
    this.id = Field.index++
  }
}

class Model {

  name = ""
  description = ""
  criteria = []
  alternatives = []

  addCriteria() {
    this.criteria.push(new Field())
  }

  deleteCriteria(id) {
    this.criteria = this.criteria.filter((f) => f.id != id)
  }

  addAlternative() {
    this.alternatives.push(new Field())
  }

  deleteAlternative(id) {
    this.alternatives = this.alternatives.filter((f) => f.id != id)
  }
}

Alpine.data('ahp',() => ({

  model: undefined,

  formatMarkdown(text) {
    return marked(text, { gfm:true })
  },

  init() {
    this.model = new Model()
  }

}))

Alpine.start()
