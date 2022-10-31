
import { default as Alpine } from "./alpine.js"
import { marked } from "./marked.esm.js"

class Field {

  static index = 0

  title = ""
  text = ""

  constructor({title,text,id}) {
    this.title = title ?? ""
    this.text = text ?? ""
    this.id = id ?? Field.index++
  }
}

class Model {

  uuid = undefined
  name = ""
  description = ""
  criteria = []
  alternatives = []

  async addCriteria(obj = {}) {
    this.criteria.push(new Field(obj))
    this.save()
  }

  deleteCriteria(id) {
    this.criteria = this.criteria.filter((f) => f.id != id)
  }

  async addAlternative(obj = {}) {
    this.alternatives.push(new Field(obj))
    this.save()
  }

  deleteAlternative(id) {
    this.alternatives = this.alternatives.filter((f) => f.id != id)
  }

  async save() {
    this.uuid = this.uuid ?? crypto.randomUUID()
    const options = {
      method: "POST", 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({uuid: this.uuid, data: JSON.stringify(this)})
    }
    const response = await fetch("https://quickahp.pages.dev/api/saveModel", options).then((r) => r.json()).catch((e) => console.log(e))
    console.log(this.uuid,response)
    window.location.hash = this.uuid
  }
}

Alpine.data('state',(uuid) => ({

  uuid: uuid.replace(/^#/,""),
  model: undefined,
  ui: { 
    criteria_modal: { show: false },
    alternatives_modal: { show: false }
  },

  formatMarkdown(text) {
    return marked(text, { gfm:true })
  },

  async init() {
    if (this.uuid === undefined) {
      this.model = new Model()
    } else {
      this.model = new Model()
      const options = {
        method: "POST", 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({uuid: this.uuid})
      }
      const { result, error } = await fetch("https://quickahp.pages.dev/api/getModel",options).then(r => r.json()).catch(e => console.log(e))
        if (result) {
            console.log(JSON.parse(result))
            this.model = Object.assign(new Model(), JSON.parse(result))
        } else if (error) {
            console.log("ERROR:",error)
        }
    }
  }

}))

Alpine.start()
