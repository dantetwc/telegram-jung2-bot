export default Object.freeze({
  CONFIG: {
    COMMAND_COOLDOWN_TIME: 1.0,
    CLEANUP_NUMBER_TO_DELETE: 10000,
    TIMEZONE: 'Asia/Hong_Kong'
  },
  MESSAGE: {
    TOP_TEN_TITLE: 'Top 10 濕鳩s in the last 7 days (last 上水 time):\n\n',
    ALL_JUNG_TITLE: 'All 濕鳩s in the last 7 days (last 上水 time):\n\n',
    LIMIT: 3800
  },
  CRON: {
    OFF_JOB: '屌你老母，夠鐘收工啦垃圾~~',
    OFF_JOB_PATTERN: '00 00 18 * * 1-5',
    DB_CLEANUP_PATTERN: '0 0 0-17,19-23 * * *'
  },
  HELP: {
    MESSAGE: '濕鳩bot' + '\n' +
    '\n' +
    'This bot is created for counting the number of message per participant in the group.' + '\n' +
    '\n' +
    'Rules:' + '\n' +
    '1. Repeated messages will only be counted as ONE message.' + '\n' +
    '2. Commands can only be used for ONCE per minute.' + '\n' +
    '\n' +
    'Commands:' + '\n' +
    '/topten  show top ten 濕鳩s' + '\n' +
    '/all19  show all 濕鳩s' + '\n' +
    '/19help  show help message' + '\n' +
    '\n' +
    'Issue/Suggestion: https://github.com/dantetwc/telegram-jung2-bot/issues' + '\n' +
    '\n' +
    'May 1c7 be with you'
  }
})
