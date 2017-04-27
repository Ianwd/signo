import * as THREE from 'three'
import debounce from 'lodash/debounce'
const OrbitControls = require('three-orbit-controls')(THREE)
const {Stats} = require('three-stats')

/**
  * App manager
  *
  * @class App
  */
class App {
  /**
    * Creates an instance of App.
    *
    * @memberOf App
    */
  constructor() {
    this._lights = []
    this._objects = []

    // Initialiser une scène
    this.initScene()
  }

  /**
    * Scene init
    *
    * @returns {undefined}
    *
    * @memberOf App
    */
  initScene() {
    console.info('initScene')
    // Create scene
    this._width = window.innerWidth
    this._height = window.innerHeight
    this._scene = new THREE.Scene()
    this._scene.name = 'DWM Scene'

    if (global.debug) {
      window.scene = this._scene
      window.THREE = THREE
    }

    // Init lightColor
    this.initLight()

    // Init camera
    this.initCamera()

    // Init renderer
    this.initRenderer()

    // MUST DEFINE
    this.bind()

    if (global.debug) {
      // Init controls
      this.initControls()

      // Init stats
      this.initStats()

      // Init helpers
      this.addHelpers()
    }

    // Render !!!
    this.render()
  }

  initLight() {
    const ambientColor = 0x999999
    const ambientLight = new THREE.AmbientLight(ambientColor, 1)

    this._scene.add(ambientLight)
    ambientLight.name = 'Ambiant Lighting'

    const spotColor = 0xffffff
    const spotLight = new THREE.SpotLight(spotColor, 0.75)

    spotLight.name = 'Spotlight'
    spotLight.position.set(-100, 100, 100)
    spotLight.castShadow = true

    this._lights.push(spotLight)
    this._scene.add(spotLight)
  }

  initCamera() {
    const fieldOfView = 60
    const aspectRatio = this._width / this._height
    const nearPlane = 1
    const farPlane = 2000

    this._camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    this._camera.position.x = 200
    this._camera.position.y = 300
    this._camera.position.z = 500

    const cameraLookX = 0
    const cameraLookY = 0
    const cameraLookZ = 0

    this._camera.lookAt(new THREE.Vector3(
      cameraLookX,
      cameraLookY,
      cameraLookZ
    ))
  }

  initListeners() {
    window.addEventListener(
      'resize',
      debounce(this._onResize.bind(this), 500)
    )
  }

  bind(){
    window.addEventListener('resize',
      debounce(this.onResize.bind(this), 500)
    )
  }

  onResize() {
    this._width = window.innerWidth
    this._height = window.innerHeight
    this._renderer.setSize(this.width, this.height)
    this._camera.aspect = this._width / this._height
    this._camera.updateProjectionMatrix()
  }

  initRenderer() {
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    this._renderer.setSize(this._width, this._height)
    this._renderer.shadowMap.enabled = true
    document.body.appendChild(this._renderer.domElement)
  }

  initControls() {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement)
  }

  initStats() {
    const statsLevel = 0

    this._stats = new Stats()
    this._stats.showPanel(statsLevel) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this._stats.dom)
  }

  render() {
    requestAnimationFrame(() => {
      this.render()
    })

    if (this._stats) {
      this._stats.begin()
    }

    this._objects.forEach((obj) => {
      obj.update()
    })

    this._renderer.render(this._scene, this._camera)

    if (this._stats) {
      this._stats.end()
    }
  }

  addHelpers() {
    this._lights.forEach((light) => {
      this.addHelper(light.shadow.camera, light.name)
    })
  }

  addHelper(camera, name) {
    const helper = new THREE.CameraHelper(camera)

    helper.name = `${name}Helper`
    this._scene.add(helper)
  }

  add(obj) {
    this._objects.push(obj)
    this._scene.add(obj.mesh)
  }
}

export default App
