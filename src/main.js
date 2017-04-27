/**
 * Main JS entry file
 */
import App from 'App'
import Cube from 'Cube'

console.info('Ready! 🚀')

global.debug = true

const app = new App()

// Ajouter mesh à scène
app.add(new Cube({
  width: 50,
  height: 50,
  depth: 50,
}, 0x00ff00))
