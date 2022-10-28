
import { default as Alpine } from "./alpine.js"

Alpine.store('context',
    await fetch("https://quickahp.pages.dev/api/context").then(r => r.json())
)

Alpine.start()
