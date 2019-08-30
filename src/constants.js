export default Object.freeze({
  CONFIG: {
    COMMAND_COOLDOWN_TIME: 1.0,
    CLEANUP_NUMBER_TO_DELETE: 10000,
    TIMEZONE: 'Asia/Hong_Kong'
  },
  MESSAGE: {
    TOP_TEN_TITLE: '最近七日十大濕鳩(last 上水 time):\n\n',
    ALL_JUNG_TITLE: '全部濕鳩(last 上水 time):\n\n',
    LIMIT: 3800
  },
  CRON: {
    OFF_JOB: '屌你老母，夠鐘收工啦垃圾~~',
    OFF_JOB_PATTERN: '00 00 18 * * 1-5',
    DB_CLEANUP_PATTERN: '0 0 0-17,19-23 * * *'
  },
  HELP: {
    MESSAGE: '我係濕鳩bot' + '\n' +
    '\n' +
    '關你撚事咩'
  }
})
