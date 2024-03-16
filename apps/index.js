import help from './help.js'
import admin from './admin.js'

let apps = { admin, help }
let rules = {} // v3
for (let key in apps) {
  rules[`${key}`] = apps[key].v3App()
}

export { rules as apps }
