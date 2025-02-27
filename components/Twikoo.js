import { useEffect, memo } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import TwikooImage from './TwikooImage'

/**
 * Giscus评论 @see https://giscus.app/zh-CN
 * Contribute by @txs https://github.com/txs/NotionNext/commit/1bf7179d0af21fb433e4c7773504f244998678cb
 * @returns {JSX.Element}
 * @constructor
 */

const Twikoo = memo(() => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const lang = siteConfig('LANG')

  useEffect(() => {
    // 在 window 对象上添加自定义图片渲染函数
    window.TwikooImageRenderer = (node) => {
      const { src, alt, width, height, className } = node
      return (
        <TwikooImage
          src={src}
          alt={alt || '评论图片'}
          width={width}
          height={height}
          className={className || 'twikoo-image'}
        />
      )
    }

    const loadTwikoo = async () => {
      try {
        await loadExternalResource(twikooCDNURL, 'js')
        const twikoo = window?.twikoo
        if (twikoo && typeof twikoo.init === 'function') {
          twikoo.init({
            envId: envId,
            el: el,
            lang: lang,
            imageRenderer: 'TwikooImageRenderer' // 使用自定义图片渲染函数
          })
        }
      } catch (error) {
        console.error('Twikoo 加载失败', error)
      }
    }

    loadTwikoo()
  }, [envId, el, twikooCDNURL, lang])

  return <div id="twikoo" />
})

Twikoo.displayName = 'Twikoo'

export default Twikoo
