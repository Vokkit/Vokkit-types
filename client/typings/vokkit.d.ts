/// <reference path="./socket.io.d.ts" />


declare class Block {
  constructor(position: THREE.Vector3, id: Number)
  getPosition(): THREE.Vector3
  setPosition(position: THREE.Vector3): void
  getId(): Number
  setId(id: Number): void
}
declare class BlockTextureManager {
  constructor()
  getTextures(): Array<THREE.MeshBasicMaterial>
  getUvsGeometry(geometry: THREE.Geometry): THREE.Geometry
  load(blockName: String): THREE.Texture
}
declare class ChatManager {
  constructor()
  sendChat(sender: String, message: String): void
  sendCommand(sender: String, message: String): void
}
declare class Chunk {
  constructor(x: Number, z: Number, chunkData: Array<Array<Array<Number>>>)
  getBlock(position: THREE.Vector3): Block
  setBlock(block: Block): void
  toMesherData(): {volume: Array<Number>, dims: Array<Number>}
  mesher(): THREE.Mesh
  containsPosition(position: THREE.Vector3): Boolean
  getLastMesh(): THREE.Mesh
}
declare class LoginManager {
  constructor(client: Client)
  isLogined(): Boolean
  requestLogin(id: String): void
}
declare class Client {
  constructor()
  loginInit(): void
  init(): void
  getLoginManager(): LoginManager
  getMoveManager(): MoveManager
  getWorldManager(): WorldManager
  getPlayerManager(): PlayerManager
  getScreenManager(): ScreenManager
  getInputManager(): InputManager
  getBlockTextureManager(): BlockTextureManager
  getSocket(): SocketIO.Socket
  getUIManager(): UIManager
  getChatManager(): ChatManager
  getWorld(worldName: String): World
  getWorlds(): Array<World>
  addWorld(world: World): void
  getPlayer(name: String): Player
  getPlayerById(id: String): Player
  getOnlinePlayers(): Array<Player>
  addPlayer(player: Player): void
  removePlayer(id: String): void
  getLocalPlayer(): LocalPlayer
  isDebug(): Boolean
}
declare class Entity {
  constructor(id: String, location: Location_, velocity: THREE.Vector3, health = 0)
  equals(object: Entity): Boolean
  getId(): String
  getLocation(): Location_
  getVelocity(): THREE.Vector3
  getHealth(): Number
  teleport(location: Location_): void
  setId(id: String): void
  setLocation(location: Location_): void
  setVelocity(velocity: THREE.Vector3): void
  setHealth(health: Number): void
}
declare class LocalPlayer extends Player {
  teleport(location: Location_): void
  static fromObject(object: Object, socket: SocketIO.Socket): LocalPlayer
  setHealth(health: Number): void
}
declare class MoveManager {
  constructor()
  requestMove(location: Location_, velocity: THREE.Vector3): void
  moveLocalPlayer(press: Array<Number>): void
}
declare class Player extends Entity {
  constructor(id: String, location: Location_, velocity: THREE.Vector3, health?: 20, name: String, type: String, inventory?: Inventory, gamemode?: 0, selectedSlotId?: 0)
  getEyeLocation(): Location_
  getName(): String
  getType(): String
  setName(name: String): void
  setType(type: String): void
  getInventory(): Inventory
  openInventory(inventory: Inventory): void
  getGameMode(): Number
  setGameMode(gamemode: Number): void
  getSelectedSlotId(): Number
  setSelectedSlotId(selectedSlotId: Number): void
  toObject(): {health: Number, name: String, x: Number, y: Number,z: Number, yaw: Number, pitch: Number, velocity: Array<Number>, id: String, worldName: String, type: String, inventory: {size: Number, contents: Array<{type: Number, amount: Number, data: Number, itemMeta: {lore: String[], displayName: String}}>}, gamemode: Number, selectedSlotId: Number}
  static fromObject(object: Object, socket: SocketIO.Socket): Player
}
declare class PlayerManager {
  constructor()
  addPlayer(data: Object, ignoreLocal: Boolean): void
  removePlayer(data: Object): void
  setHealth(data: Object): void
}
declare class Inventory {
  constructor(size: Number, contents?: Array<ItemStack>)
  getContents(): Array<ItemStack>
  getItem(count: Number): ItemStack 
  setItem(count: Number, item: ItemStack): void
  addItem(items: Array<ItemStack>): void
  addItem(item: ItemStack): void
  removeItem(items: Array<ItemStack>): void
  removeItem(item: ItemStack): void
  toObject(): {size: Number, contents: Array<{type: Number, amount: Number, data: Number, itemMeta: {lore: String[], displayName: String}}>}
  static fromObject(object: Object): Inventory
}
declare class ItemMeta {
  constructor(lore?: String[], displayName?: String)
  getLore(): String[]
  setLore(lore: String[]): void
  getDisplayName(): String
  setDisplayName(displayName: String): void
  equals(itemMeta: ItemMeta): Boolean
  toObject(): {lore: String[], displayName: String}
  static fromObject(object: Object): ItemMeta
}
declare class ItemStack {
  constructor(type: Material, amount?: 1, data?: 0)
  getType(): Material
  setType(type: Material): void
  getAmount(): Number
  setAmount(amount: Number): void
  getData(): Number
  setData(data: Number): void
  getItemMeta(): ItemMeta
  setItemMeta(itemMeta: ItemMeta): void
  equals(item: ItemStack): Boolean
  toObject(): {type: Number, amount: Number, data: Number, itemMeta: {lore: String[], displayName: String}}
  static fromObject(object: Object): ItemStack
}
declare class Location_ {
  constructor(world: World, x: Number, y: Number, z: Number, yaw?: 0, pitch?: 0)
  static locToBlock(loc: Location_): Location_
  getWorld(): World
  setWorld(world: World): Location_
  getX(): Number
  getY(): Number
  getZ(): Number
  getYaw(): Number
  getPitch(): Number
  setX(x: Number): Location_
  setY(y: Number): Location_
  setZ(z: Number): Location_
  setYaw(yaw: Number): Location_
  setPitch(pitch: Number): Location_
  distance(loc: Location_): Number
  distanceSquared(loc: Location_): Number
  set(loc: Location_): Location_
  set(arr: Array<Number>): Location_
  set(x: Number, y: Number, z: Number): Location_
  add(loc: Location_): Location_
  add(arr: Array<Number>): Location_
  add(x: Number, y: Number, z: Number): Location_
  subtract(loc: Location_): Location_
  subtract(arr: Array<Number>): Location_
  subtract(x: Number, y: Number, z: Number): Location_
  toVector(): THREE.Vector3
  clone(): Location_
  copy(loc: Location_): Location_
  equals(loc: Location_): Boolean
}
declare class Material {
  constructor(id: Number)
  equals(material: Material): Boolean
  getName(): String
  AIR: Material
  STONE: Material
  GRASS: Material
  DIRT: Material
  get(name: String): Material
}
declare class CulledMesh {
  static optimize(volume: Array<Number>, dims: Array<Number>)
}
declare class GreedyMesh {
  static optimize(volume: Array<Number>, dims: Array<Number>)
}
declare class PluginBase {
  onLoad(): void
  onEnable(): void
  onDisable(): void
}
declare class PluginManager {
  constructor()
  load(): void
  enable(): void
}
declare class PlayerRenderer extends Renderer {
  constructor(skinPath: String, player: Player)
  playAnimation(animationName: String): void
  updatePosition(location: Location_, velocity: THREE.Vector3): void
  checkMove(location: Location_, velocity: THREE.Vector3): void
}
declare class Renderer {
  constructor(skinPath: String)
}
declare class InputBinder {
  constructor()
  // set
  setKeyDownListener(listener: Function): void
  setkeyUpListener(listener: Function): void
  setMouseDownListener(listener: Function): void
  setMouseMoveListener(listener: Function): void
  setMouseUpListener(listener: Function): void
  setMouseWheelListener(listener: Function): void
}
declare class InputManager {
  constructor()
  showCursor(): void
  dismissCursor(): void
  setInput(): void
}
declare class Screen {
  constructor(name: String, type: 'base' | 'stack', inputBinder: InputBinder)
  getName(): String
  getInputBinder(): InputBinder
  show(): void
  dismiss(): void
}

declare class ScreenChooser {
  constructor(screenProvider: ScreenProvider)
  setScreen(screen: Screen): void
  getScreen(name: String): Screen
  popScreen(): void
  getNowScreen(): String
}
declare class ScreenManager {
  constructor()
  init(): void
  getScreen(screenName: String): Screen
  getNowScreen(): Screen
  addScreen(screenName: String): void
  getScreenProvider(): ScreenProvider
  getScreenChooser(): ScreenChooser
}
declare class ScreenProvider {
  constructor()
  register(screen: Screen): void
  unregister(screen: Screen): void
  getAllScreens(): Array<String>
}
declare class ChatScreen extends Screen {
  constructor()
  init(): void
  initInput(): void
}
declare class MainScreen extends Screen {
  constructor()
  init(): void
  initScreen(): void
  getCamera(): THREE.PerspectiveCamera
  getScene(): THREE.Scene
  getGroup(): THREE.Group
  updateGroup(location: Location_): void
  getRenderer(): THREE.WebGLRenderer
  getFPS(): Number
  setFPS(FPS: Number): void
  clearWorld(): void
  reloadChunk(chunk: Chunk): void
  drawWorld(world: World): void
  start(): void
}
declare class MainUIScreen extends Screen {
  constructor()
  init(): void
  initInput(): void
  syncMouse(): void
}
declare class UIManager {
  init(): void
  toggleChat(): void
  isChatting(): Boolean
  addChat(sender: String, message: String, format: String): void
  clearChat(): void
  updateCrossbarSelected(): void
  updateHealthBar(): void
}
declare class Vokkit {
  static init(plugins: String[])
  static getClient(): Client
}
declare class World {
  constructor(worldName: String)
  static prepareWorlds(data: Object): void
  prepareWorld(data: Object): void
  getBlock(position: THREE.Vector3): Block
  setBlock(block: Block): void
  getWorldName(): String
  getChunks(): Chunk[]
}
declare class WorldManager {
  constructor()
}

