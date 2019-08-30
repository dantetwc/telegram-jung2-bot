import log from 'log-to-file-and-console-node'
import _ from 'lodash'
import MessageController from './controller/message'
import HelpController from './controller/help'
import DebugController from './controller/debug'
import SystemAdmin from './helper/systemAdmin'

const messageController = new MessageController()
const helpController = new HelpController()
const systemAdmin = new SystemAdmin()

const on9West = [
  'https://www.hk01.com/突發/351000/山頂道寶馬自炒-墮10米山坡',
  'https://hk.news.appledaily.com/breaking/realtime/article/20190712/59814270',
  'http://hd.stheadline.com/news/realtime/hk/1542531/%E5%8D%B3%E6%99%82-%E6%B8%AF%E8%81%9E-%E5%AF%B6%E9%A6%AC%E5%B1%B1%E9%A0%82%E9%81%93%E8%A1%9D%E8%90%BD%E5%B1%B1%E5%9D%A1-%E5%8F%B8%E6%A9%9F%E7%A8%B1%E8%B7%AF%E6%BB%91%E9%81%BF%E7%8B%97',
  'https://news.mingpao.com/ins/%E6%B8%AF%E8%81%9E/article/20190712/s00001/1562897399351/%E5%B1%B1%E9%A0%82%E5%AF%B6%E9%A6%AC%E9%81%BF%E7%8B%97%E5%A4%B1%E6%8E%A7%E8%A1%9D%E4%B8%8B%E5%B1%B1%E5%9D%A1',
  'https://www.msn.com/zh-hk/news/localnews/%E5%AF%B6%E9%A6%AC%E5%B1%B1%E9%A0%82%E9%81%93%E8%A1%9D%E8%90%BD%E5%B1%B1%E5%9D%A1-%E5%8F%B8%E6%A9%9F%E7%A8%B1%E8%B7%AF%E6%BB%91%E9%81%BF%E7%8B%97/ar-AAEc9oy',
  'https://today.line.me/hk/pc/article/寶馬山頂道衝落山坡+司機稱路滑避狗-7orr7n',
  'https://hk.news.yahoo.com/寶馬山頂道衝落山坡-司機稱路滑避狗-233800654.html',
  'https://hk.news.yahoo.com/山頂道寶馬自炒-墮10米山坡-011700249.html',
  'https://hk.on.cc/hk/bkn/cnt/news/20190712/bkn-20190712064551541-0712_00822_001.html',
  '今日認左人做表妹未呀？',
  '垃圾大話精',
  '借到七千萬遊艇未?'
]

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
      this.bot.sendMessage(msg.chat.id, '@burnme', {reply_to_message_id: msg.message_id})
    }

    if (msg.text.match(/呢個世界最垃圾既係咩車/g)) {
      this.bot.sendMessage(msg.chat.id, 'Audi S4 B8.5', {reply_to_message_id: msg.message_id})
    }

    if(msg.from.id == '199645272') {
      let index = Math.floor(Math.random() * Math.floor(on9West.length - 1))
      this.bot.sendMessage(msg.chat.id, on9West, {reply_to_message_id: msg.message_id})
    }
  }

  onDebug (msg) {
    if (systemAdmin.isAdmin(msg)) {
      const debugController = new DebugController(this.bot)
      debugController.healthCheck(msg)
    }
  }
}
