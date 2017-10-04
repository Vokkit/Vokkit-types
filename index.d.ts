declare class Block{
  constructor(position: THREE.Vector3, id: Number)
  setId(id: Number): void
  getId(): Number
  getPosition(): THREE.Vector3
}

declare class Command{
  constructor(name: String, description: String, usage: String, parameterTypes: Array<String>, provider?: String)
  getName(): String
  getDescription(): String
  getUsage(): String
  getParameterTypes(): Array<Number>
  getProvider(): String
}

declare class Parameter{
  constructor(type: String, value: Object)
  static toParameter(type: String, str: String): void
  getType(): String
  getValue(): Object
}

declare class ParameterType{
  static STRING: 'string'
  static NUMBER: 'number'
  static PLAYER: 'player'
  static BOOLEAN: 'boolean'
  static toType(parameter: Object): String
}

declare class CommandExecutor{
  constructor(provider: CommandProvider)
  execute(sender: String, command: String, parameter: Array<Parameter>, provider?: String): void
}

declare class CommandProvider{
  constructor()
  register(command: Command): void
  unregister(command: Command): void
  getAllCommands(): Array<Command>
}

declare class CommandSender{
  constructor()
  sendMessage(message: String): void
  getName(): String
  getServer(): Server
}

declare class ConsoleCommandSender extends CommandSender{
  constructor()
  sendMessage(message: String): void
}

declare class ConsoleManager{
  init(): void
}

declare class PlayerCommandSender extends CommandSender{
  constructor()
  sendMessage(message: String): void
  getPlayer(): Player
}

declare class Entity{
  constructor(id: Number, location: Location_, velocity: THREE.Vector3)
  getId(): Number
  getLocation(): Location_
  teleport(loc: Location_, update?: Boolean): void
  getVelocity(): THREE.Vector3
  setVelocity(velocity: THREE.Vector3): void
  equals(object: Object): Boolean
}

declare class Player extends Entity{
  constructor(id: Number, location: Location_, velocity: THREE.Vector3, name: String, socket: SocketIO.Socket, type: String)
  getName(): String
  getSocket(): SocketIO.Socket
  getAddress(): String
  getPort(): String
  getType(): String
  setType(type: String): void
  sendMessage(sender: String, message: String, format?: String): void
  toObject(): {name: String, x: Number, y: Number, z: Number, yaw: Number, pitch: Number, velocity: THREE.Vector3, id: Number, worldName: String, type: String}
}

declare class BlockBreakEvent extends CancellableBlockEvent{
  constructor(block: Block, player: Player)
  getPlayer(): Player
  setDropItems(dropItems?: Boolean): void
  isDropItems(): Boolean
}

declare class BlockEvent extends Event{
  constructor(block: Block)
  getBlock(): Block
}

declare class BlockPlaceEvent extends CancellableBlockEvent{
  constructor(placedBlock: Block, placedAgainst: Block, itemInHand: Object, player: Player)
  getPlayer(): Player
  getBlockAgainst(): Block
  setDropItems(dropItems?: Boolean): void
  isDropItems(): Boolean
}

declare class CancellableBlockEvent extends CancellableEvent {
  constructor(block: Block)
  getBlock(): Block
}

declare class CancellablePlayerEvent extends CancellableEvent {
  constructor(player: Player)
  getPlayer(): Player
}

declare class PlayerChatEvent extends CancellablePlayerEvent {
  constructor(player: Player, sender: String, message: String, format: String)
  getSender(): String
  getMessage(): String
  getFormat(): String
  setSender(sender: String): void
  setMessage(message: String): void
  setFormat(format: String): void
}

declare class PlayerEvent extends Event{
  constructor(player: Player)
  getPlayer(): Player
}

declare class PlayerJoinEvent extends PlayerEvent{
  constructor(player: Player, joinMessage: String)
  getJoinMessage(): String
  setJoinMessage(joinMessage: String): void
}

declare class PlayerLoginEvent extends CancellablePlayerEvent{
  constructor(player: Player, address: String)
  getAddress(): String
  getReason(): String
  setReason(reason: String): void
}

declare class PlayerMoveEvent extends CancellablePlayerEvent{
  constructor(player: Player, from: Location_, to: Location_)
  getFrom(): Location_
  getTo(): Location_
  setFrom(from: Location_): void
  setTo(to: Location_): void
}

declare class PlayerQuitEvent extends PlayerEvent{
  constructor(player: Player, quitMessage: String)
  getQuitMessage(): String
  setQuitMessage(message: String): void
}

declare class CancellableServerEvent extends CancellableEvent{

}

declare class ServerCommandEvent extends CancellableServerEvent{
  constructor(sender: String, command: Command, parameter: Array<Parameter>)
  getCommand(): Command
  getParameter(): Array<Parameter>
  getSender(): String
  setCommand(command: Command): void
  setParameter(parameter: Array<Parameter>): void
}

declare class ServerEvent extends Event {
  
}

declare class SocketConnectionEvent extends SocketEvent {
  constructor(socket: SocketIO.Socket)
}

declare class SocketEvent extends Event {
  constructor(socket: SocketIO.Socket)
  getSocket(): SocketIO.Socket
}

declare class CancellableEvent extends Event {
  constructor()
  setCancelled(cancelled?: Boolean): void
  isCancelled(): Boolean
}

declare class Event {
  getEventName(): String
}

declare class EventPriority {
  static HIGHEST: 5
  static HIGH: 4
  static NORMAL: 3
  static LOW: 2
  static LOWEST: 1
  static MONITOR: 0
}

declare class ChatManager extends SocketManager{
  addListener(socket: SocketIO.Socket): void
  sendSystemMessage(message: String): void
}

declare class CommandManager extends SocketManager{
  constructor()
  init(): void
  addListener(socket: SocketIO.Socket): void
  call(message: String): void
  getCommandProvider(): CommandProvider
  getCommandExecutor(): CommandExecutor
}

declare class DisconnectManager extends SocketManager{
  addListener(socket: SocketIO.Socket): void
}

declare class LoginManager extends SocketManager{
  addListener(socket: SocketIO.Socket): void
}

declare class MoveManager extends SocketManager{
  addListener(socket: SocketIO.Socket): void
}

declare class PlayerSkinManager extends SocketManager{
  addListener(socket: SocketIO.Socket): void
}

declare class SocketManager{
  init(): void
  getLoginManager(): LoginManager
  getMoveManager(): MoveManager
  getWorldManager(): WorldManager
  getPlayerSkinManager(): PlayerSkinManager
  getDisconnectManager(): DisconnectManager
  getChatManager(): ChatManager
  getCommandManager(): CommandManager
}

declare class WorldManager extends SocketManager{
  addListener(socket: SocketIO.Socket): void
  getWorldArray(): Array<Array<Array<Number>>>
}

declare class PluginBase{
  onLoad(): void
  onEnable(): void
  onDisable(): void
}

declare class PluginManager{
  init(): void
  loadPlugin(name: String): void
  loadPlugins(): void
  enablePlugins(): void
  registerEvent(plugin: PluginBase, name: String, event: Function, eventPriority?: Number)
  makeEvent(event: Event)
}

declare class Chunk{
  constructor(x: Number, z: Number, chunkData: Array<Array<Array<Number>>>)
  getBlock(position: THREE.Vector3): Block
  setBlock(block: Block): void
  containsPosition(position: THREE.Vector3): Boolean
}

declare class Location_{
  constructor(world?: World, x?: Number, y?: Number, z?: Number, yaw?: Number, pitch?: Number)
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
  static locToBlock(loc: Location_): Location_
}

declare class Logger{
  info(message: String): void
  warn(message: String): void
  chat(message: String): void
}

declare class Material{
  constructor(id: Number)
  equals(material: Material): Boolean
  getName(): String
  static AIR: Material
  static STONE: Material
  static GRASS: Material
  static DIRT: Material
  static get(name: String): Material
}

declare class Server{
  constructor()
  init(startTime: Number): void
  getWorld(worldName: String): World
  getWorlds(): Array<World>
  getPlayer(name: String): Player
  addPlayer(player: Player): void
  removePlayer(player: Player): void
  getPlayerById(id: Number): Player
  getPlayers(): Array<Player>
  getSocketServer(): SocketIO.Server
  getLoginManager(): LoginManager
  getMoveManager(): MoveManager
  getWorldManager(): WorldManager
  getPlayerSkinManager(): PlayerSkinManager
  getDisconnectManager(): DisconnectManager
  getPluginManager(): PluginManager
  getChatManager(): ChatManager
  getCommandManager(): CommandManager
  getSocketManager(): SocketManager
  getLogger(): Logger
  getName(): 'server'
  static protocolVersion: 1
  static version: '0.0.1'
}

declare class Util{
  static arrayEquals(a: Object, b: Object): Boolean
  static equals(a: Object, b: Object): Boolean
}

declare class World{
  constructor(worldName: String)
  prepareWorld(): void
  getBlock(position: THREE.Vector3): Block
  setBlock(block: Block): void
  getWorldName(): String
  toArray(): Array<Array<Number>>
  saveWorld(afterdo: Function): void
  equals(world: World): Boolean
  static loadAllWorlds(): Array<World>
}

declare class Vokkit{
  static init(): void
  static getServer(): Server
}