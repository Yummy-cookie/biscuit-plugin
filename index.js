import { Data, Version } from './components/index.js'
import Index from './apps/index2.js'

if (!global.segment)
  global.segment = (await import('oicq')).segment

if (!segment.button)
  segment.button = () => ""

export * from './apps/index.js'

if (Bot?.logger?.info) {
  Bot.logger.info('---------^_^---------')
  Bot.logger.info(`饼干插件${Version.version}初始化~`)
} else {
  console.log(`饼干插件${Version.version}初始化~`)
}

setTimeout(Index.init, 1000)
