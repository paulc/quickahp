
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

  async save() {
    const uuid = crypto.randomUUID()
    const options = {
      method: "POST", 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({uuid: uuid, data: JSON.stringify(this)})
    }
    const response = await fetch("https://quickahp.pages.dev/api/saveModel", options).then((r) => r.json()).catch((e) => console.log(e))
    console.log(uuid,response)
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
