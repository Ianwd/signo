import * as THREE from 'three'

/**
  * Cube manager
  *
  * @class Cube
  */
class Cube {
  /**
    * @param {object} size cube dimensions
    * @param {number} size.width width
    * @param {number} size.height height
    * @param {number} size.depth depth
    *
    * @memberOf Cube
    */
  constructor(size, color = 0xffffff) {
    // Initialiser le cube
    this._size = size
    this._color = color

    this.init()
  }

  /**
    * Cube init
    *
    * @returns {undefined}
    *
    * @memberOf Cube
    */
  init() {
    const geometry = new THREE.BoxBufferGeometry(
      this._size.width,
      this._size.height,
      this._size.depth
    )
    const material = new THREE.MeshLambertMaterial({
      color: this._color,
      wireframe: false,
      shading: THREE.FlatShading,
    })

    this._mesh = new THREE.Mesh(geometry, material)
    this._mesh.castShadow = true
    this._mesh.receiveShadow = true
    this._mesh.name = 'cube'
  }

  /**
    * Get mesh
    *
    * @readonly
    *
    * @memberOf Cube
    */
  get mesh() {
    return this._mesh
  }

  update() {
    this._mesh.rotation.x += 0.01
  }
}

export default Cube
