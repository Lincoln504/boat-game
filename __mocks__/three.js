// __mocks__/three.js

// --- Core Classes ---
export class WebGLRenderer {
  constructor() {
    console.log('Mock WebGLRenderer constructor called');
  }
  setSize() {}
  setPixelRatio() {}
  render() {}
  setAnimationLoop(_callback) {
    // In a real test environment, you might want to control the execution of this callback
    // For now, just acknowledge it.
    console.log('Mock WebGLRenderer.setAnimationLoop called');
  }
  domElement = (() => {
    console.log('[Mock WebGLRenderer] Creating domElement. typeof global.document:', typeof global?.document, 'typeof global.document.createElement:', typeof global?.document?.createElement);
    if (typeof global !== 'undefined' && global.document && typeof global.document.createElement === 'function') {
      // If a global document with createElement exists (like in jsdom/happy-dom), use it.
      try {
        const canvas = global.document.createElement('canvas');
        console.log('[Mock WebGLRenderer] Successfully created canvas with global.document.createElement.');
        // Add basic properties jsdom might expect on a canvas
        canvas.style = {};
        canvas.addEventListener = () => {};
        canvas.removeEventListener = () => {};
        canvas.getContext = () => { // Mock getContext as it might be called
          console.log('[Mock WebGLRenderer] canvas.getContext called');
          return {
            fillRect: () => {},
            clearRect: () => {},
            getImageData: () => ({data: []}),
            putImageData: () => {},
            createImageData: () => ({data: []}),
            setTransform: () => {},
            drawImage: () => {},
            save: () => {},
            restore: () => {},
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            closePath: () => {},
            stroke: () => {},
            fill: () => {},
            // Add other context methods if needed
          };
        };
        return canvas;
      } catch (e) {
        console.error('[Mock WebGLRenderer] Error creating canvas with global.document.createElement:', e);
        // Fallback to plain object if createElement fails for some reason
      }
    }
    // Fallback plain object if global.document.createElement is not available or fails
    console.log('[Mock WebGLRenderer] Falling back to plain object for domElement.');
    return {
      style: {},
      addEventListener: () => {},
      removeEventListener: () => {},
      appendChild: (child) => {
        if (!this.childNodes) this.childNodes = [];
        this.childNodes.push(child);
        return child;
      },
      removeChild: (child) => {
        if (this.childNodes) {
          const index = this.childNodes.indexOf(child);
          if (index > -1) this.childNodes.splice(index, 1);
        }
        return child;
      },
      setAttribute: () => {},
      removeAttribute: () => {},
      hasAttribute: () => false,
      getAttribute: () => null,
      nodeType: 1,
      nodeName: 'CANVAS',
      tagName: 'CANVAS',
      ownerDocument: null, // Cannot reliably set this for plain object
      parentNode: null,
      childNodes: [],
      getContext: () => ({ fillRect: () => {} }), // Basic getContext mock
    };
  })();
  shadowMap = { enabled: false };
  toneMapping = null;
  toneMappingExposure = 1.0;
}

export class Scene {
  constructor() {
    this.children = [];
  }
  add(...args) {
    args.forEach(arg => this.children.push(arg));
  }
  remove(...args) {
    args.forEach(arg => {
      const index = this.children.indexOf(arg);
      if (index > -1) {
        this.children.splice(index, 1);
      }
    });
  }
  getObjectByName(name) {
    return this.children.find(child => child.name === name);
  }
  traverse(callback) {
    this.children.forEach(child => {
      callback(child);
      if (child.traverse) { // If child itself has children (e.g. Object3D)
        child.traverse(callback);
      }
    });
  }
  background = null;
  fog = null;
}

export class PerspectiveCamera {
  constructor(fov, aspect, near, far) {
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.position = new Vector3();
    this.up = new Vector3(0, 1, 0);
  }
  lookAt() {}
  updateProjectionMatrix() {}
}

export class Object3D {
  constructor() {
    this.position = new Vector3();
    this.rotation = { x: 0, y: 0, z: 0, _order: 'XYZ', setFromQuaternion: () => {} }; // Simplified Euler
    this.quaternion = new Quaternion();
    this.scale = new Vector3(1, 1, 1);
    this.children = [];
    this.matrixWorld = { elements: new Array(16).fill(0) }; // Simplified matrix
    this.name = '';
  }
  add(...args) {
    args.forEach(arg => this.children.push(arg));
  }
  remove(...args) {
    args.forEach(arg => {
      const index = this.children.indexOf(arg);
      if (index > -1) {
        this.children.splice(index, 1);
      }
    });
  }
  rotateY() {}
  translateZ() {}
  getWorldPosition(target) { return target.copy(this.position); }
  getWorldQuaternion(target) { return target.copy(this.quaternion); }
  applyMatrix4() {}
  applyQuaternion(_q) { this.quaternion.multiply(_q); return this; } // Simplified
  traverse(callback) {
    callback(this);
    this.children.forEach(child => {
      if (child.traverse) {
        child.traverse(callback);
      } else {
        callback(child);
      }
    });
  }
  updateMatrixWorld() {}
}

export class Mesh extends Object3D {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
    this.castShadow = false;
    this.receiveShadow = false;
    this.isMesh = true;
    this.renderOrder = 0;
    this.visible = true;
  }
}

export class InstancedMesh extends Mesh {
    constructor(geometry, material, count) {
        super(geometry, material);
        this.isInstancedMesh = true;
        this.count = count;
    }
    // Add any methods specific to InstancedMesh your code might use
}


// --- Geometries ---
export class BufferGeometry {
  constructor() {
    this.attributes = {};
    this.index = null;
    this.groups = [];
  }
  setAttribute(name, attribute) { this.attributes[name] = attribute; }
  setIndex(index) { this.index = index; }
  addGroup(start, count, materialIndex) { this.groups.push({ start, count, materialIndex }); }
  computeVertexNormals() {}
  // Add other methods if needed, e.g., dispose, clone
}

export class BoxGeometry { constructor() { /* Mock */ } }
export class SphereGeometry { constructor() { /* Mock */ } }
export class CylinderGeometry { constructor() { /* Mock */ } }
export class PlaneGeometry {
  constructor() {
    this.attributes = {
      uv: { clone: () => ({ /* mock uv attribute */ }) }
    };
  }
  setAttribute() {}
}


// --- Materials ---
export class MeshStandardMaterial {
  constructor(params) {
    this.map = params?.map || null;
    this.metalness = params?.metalness || 0;
    this.roughness = params?.roughness || 0;
    this.side = params?.side || FrontSide;
    this.color = params?.color ? new Color(params.color) : new Color(0xffffff);
    this.needsUpdate = false;
    this.fog = true; // Default for main.js
    this.isShaderMaterial = false;
  }
}
export class MeshPhongMaterial {
  constructor(params) {
    this.color = params?.color ? new Color(params.color) : new Color(0xffffff);
    this.fog = true;
    this.isShaderMaterial = false;
  }
}
export class MeshBasicMaterial {
  constructor(params) {
    this.color = params?.color ? new Color(params.color) : new Color(0xffffff);
    this.side = params?.side || FrontSide;
    this.transparent = params?.transparent || false;
    this.opacity = params?.opacity || 1;
    this.fog = params?.fog === undefined ? true : params.fog;
    this.isShaderMaterial = false;
  }
}
export class ShaderMaterial {
  constructor(params) {
    this.vertexShader = params?.vertexShader || '';
    this.fragmentShader = params?.fragmentShader || '';
    this.uniforms = params?.uniforms || {};
    this.side = params?.side || FrontSide;
    this.transparent = params?.transparent || false;
    this.fog = params?.fog === undefined ? true : params.fog; // Default based on main.js usage
    this.isShaderMaterial = true;
  }
}

// --- Lights ---
export class AmbientLight { constructor() { /* Mock */ } }
export class DirectionalLight {
  constructor() {
    this.castShadow = false;
    this.position = new Vector3();
    this.target = new Object3D(); // Lights have a target
    this.shadow = {
      mapSize: { width: 512, height: 512 },
      camera: { near: 0.5, far: 500, left: -50, right: 50, top: 50, bottom: -50, updateProjectionMatrix: () => {} },
      bias: 0
    };
  }
}

// --- Helpers ---
export class AxesHelper { constructor() { /* Mock */ } }
export class Box3 {
  constructor() {
    this.min = new Vector3();
    this.max = new Vector3();
  }
  setFromObject() { return this; } // Chainable
  getSize(target) { return target.set(0,0,0); }
  getCenter(target) { return target.set(0,0,0); }
}

// --- Loaders ---
export class TextureLoader {
  load(url, onLoad, _onProgress, _onError) {
    console.log(`Mock TextureLoader: loading ${url}`);
    // Simulate async loading and call onLoad if provided
    if (onLoad) {
      setTimeout(() => {
        const mockTexture = {
          wrapS: null, wrapT: null, repeat: { set: () => {} },
          needsUpdate: false, isTexture: true
        };
        onLoad(mockTexture);
      }, 0);
    }
    return { wrapS: null, wrapT: null, repeat: { set: () => {} }, needsUpdate: false, isTexture: true }; // Return a mock texture object
  }
}

// --- Math ---
export class Vector2 {
    constructor(x = 0, y = 0) { this.x = x; this.y = y; }
    set(x, y) { this.x = x; this.y = y; return this; }
}
export class Vector3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
  set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
  add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  addScaledVector(v, s) { this.x += v.x * s; this.y += v.y * s; this.z += v.z * s; return this; }
  applyQuaternion(_q) { /* simplified */ return this; }
  clone() { return new Vector3(this.x, this.y, this.z); }
  normalize() { return this; }
  transformDirection(_m) { /* simplified */ return this; }
  lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z; }
  multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
  setFromSphericalCoords(_radius, _phi, _theta) { /* simplified */ return this; }
}
export class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) { this.x = x; this.y = y; this.z = z; this.w = w; }
  copy(q) { this.x = q.x; this.y = q.y; this.z = q.z; this.w = q.w; return this; }
  multiply(_q) { /* simplified */ return this; }
  // Add other methods if your code uses them (e.g., setFromEuler, slerp)
}
export class Color {
  constructor(r, g, b) {
    if (typeof r === 'number' && g === undefined && b === undefined) { // hex
      this.r = ((r >> 16) & 255) / 255;
      this.g = ((r >> 8) & 255) / 255;
      this.b = (r & 255) / 255;
    } else {
      this.r = r; this.g = g; this.b = b;
    }
  }
  set() {}
}
export const MathUtils = {
  degToRad: (degrees) => degrees * (Math.PI / 180),
  // Add other MathUtils functions if used
};

// --- Core ---
export class Clock {
  constructor(autoStart = true) {
    this.autoStart = autoStart;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.running = false;
    if (this.autoStart) this.start();
  }
  start() {
    this.startTime = (typeof performance === 'undefined' ? Date : performance).now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }
  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }
  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }
  getDelta() {
    let diff = 0;
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }
    if (this.running) {
      const newTime = (typeof performance === 'undefined' ? Date : performance).now();
      diff = (newTime - this.oldTime) / 1000;
      this.oldTime = newTime;
      this.elapsedTime += diff;
    }
    return diff;
  }
}
export class Raycaster {
  constructor(origin, direction, near, far) {
    this.ray = { origin: origin || new Vector3(), direction: direction || new Vector3() };
    this.near = near || 0;
    this.far = far || Infinity;
  }
  set(origin, direction) {
    this.ray.origin.copy(origin);
    this.ray.direction.copy(direction);
  }
  intersectObject(_object, _recursive) {
    // Basic mock: return an empty array or a mock intersection if needed for tests
    console.log('Mock Raycaster.intersectObject called');
    // Example mock intersection:
    // return [{ distance: 1, point: new Vector3(), object: _object, face: { normal: new Vector3(0,1,0) } }];
    return [];
  }
  intersectObjects(_objects, _recursive) {
    console.log('Mock Raycaster.intersectObjects called');
    return [];
  }
}
export class BufferAttribute {
  constructor(array, itemSize, normalized = false) {
    this.array = array;
    this.itemSize = itemSize;
    this.normalized = normalized;
    this.count = array ? array.length / itemSize : 0;
  }
  clone() {
    return new BufferAttribute(this.array.slice(), this.itemSize, this.normalized);
  }
  // Add other methods if needed (e.g., setXYZ, getX)
}


// --- Constants (as used in main.js) ---
export const DoubleSide = 2;
export const FrontSide = 0; // Assuming FrontSide is 0, common default
export const BackSide = 1;  // Assuming BackSide is 1
export const RepeatWrapping = 1000;
export const MirroredRepeatWrapping = 1001; // Example value
export const ClampToEdgeWrapping = 1002; // Example value
export const ACESFilmicToneMapping = 4; // Example value, check three.js source for actual
export const NoToneMapping = 0;
export const LinearToneMapping = 1;
export const ReinhardToneMapping = 2;
export const CineonToneMapping = 3;


// --- Fog ---
export class Fog {
  constructor(color, near, far) {
    this.name = '';
    this.color = new Color(color);
    this.near = near;
    this.far = far;
  }
  clone() { return new Fog(this.color, this.near, this.far); }
  toJSON() { return { type: 'Fog', color: this.color.getHex(), near: this.near, far: this.far }; }
}


// --- Mock JSM modules if Vitest doesn't auto-mock them based on `three` mock ---
// Vitest typically handles this, but as a fallback or for clarity:
export const GLTFLoader = class {
  setDRACOLoader() {}
  load(url, onLoad, _onProgress, _onError) {
    console.log(`Mock GLTFLoader: loading ${url}`);
    if (onLoad) {
      setTimeout(() => onLoad({ scene: new Scene() }), 0); // Return a mock scene
    }
  }
};
export const DRACOLoader = class {
  setDecoderPath() {}
};
export const Sky = class extends Object3D { // Sky extends Object3D
  constructor() {
    super(); // Call Object3D constructor
    this.material = { uniforms: {
      turbidity: { value: 0 },
      rayleigh: { value: 0 },
      mieCoefficient: { value: 0 },
      mieDirectionalG: { value: 0 },
      sunPosition: { value: new Vector3() }
    }};
    this.scale = { setScalar: () => {} }; // Mock scale method
    this.isSky = true; // Add a property to identify it as Sky
  }
  // Add other Sky methods/properties if used
};

// Ensure all exports used by main.js are covered.
// If `import * as THREE from 'three'` is used, every THREE.Component needs to be here.
