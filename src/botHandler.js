import log from 'log-to-file-and-console-node'
import _ from 'lodash'
import MessageController from './controller/message'
import HelpController from './controller/help'
import DebugController from './controller/debug'
import SystemAdmin from './helper/systemAdmin'

const messageController = new MessageController()
const helpController = new HelpController()
const systemAdmin = new SystemAdmin()

export default class BotHandler {
  constructor (bot) {
    this.bot = bot
  }

  async onTopTen (msg) {
    try {
      const message = await messageController.getTopTen(msg)
      if (!_.isEmpty(message)) { this.bot.sendMessage(msg.chat.id, message) }
    } catch (e) {
      log.e(`/topten err: ${e.message}`, process.env.DISABLE_LOGGING)
      this.bot.sendMessage(msg.chat.id, 'Server Error')
    }
  }

  async onAllJung (msg) {
    try {
      const message = await messageController.getAllJung(msg)
      if (!_.isEmpty(message)) { this.bot.sendMessage(msg.chat.id, message) }
    } catch (e) {
      log.e(`/all19s err: ${e.message}`, process.env.DISABLE_LOGGING)
      this.bot.sendMessage(msg.chat.id, 'Server Error')
    }
  }

  onHelp (msg) {
    this.bot.sendMessage(msg.chat.id, helpController.getHelp())
  }

  async onMessage (msg) {
    log.i(JSON.stringify(msg), process.env.DISABLE_LOGGING)
    if (messageController.shouldAddMessage(msg)) {
      await messageController.addMessage(msg)
      log.i('add message success', process.env.DISABLE_LOGGING)
    } else {
      log.e('skip repeated message', process.env.DISABLE_LOGGING)
    }

    if (msg.text.match(/1c7 is fucking gay/g)) {
      this.bot.sendMessage(msg.chat.id, '不能同意更多', {reply_to_message_id: msg.message_id})
    }

    if (msg.text.match(/VAG垃圾車/g)) {
      this.bot.sendMessage(msg.chat.id, '你講得好岩!', {reply_to_message_id: msg.message_id})
    }

    if (msg.text.match(/i am gay/g)) {
      this.bot.sendMessage(msg.chat.id, '!', {reply_to_message_id: msg.message_id})
    }

    if (msg.text.match(/呢個世界邊個最gay/g)) {
      this.bot.sendMessage(msg.chat.id, '@burnme', {reply_to_message_id: msg.message_id})
    }

    if (msg.text.match(/呢個世界邊個最變態/g)) {
      this.bot.sendMessage(msg.chat.id, '@310014780', {reply_to_message_id: msg.message_id})
    }

    if (msg.text.match(/呢個世界最垃圾既係咩車/g)) {
      this.bot.sendMessage(msg.chat.id, 'Audi S4 B8', {reply_to_message_id: msg.message_id})
    }
  }

  onDebug (msg) {
    if (systemAdmin.isAdmin(msg)) {
      const debugController = new DebugController(this.bot)
      debugController.healthCheck(msg)
    }
  }
}
