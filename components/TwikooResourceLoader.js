import Head from 'next/head'
import { siteConfig } from '@/lib/config'
import { memo, useMemo } from 'react'

const TwikooResourceLoader = memo(({ shouldLoad }) => {
  const COMMENT_TWIKOO_CDN_URL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const COMMENT_TWIKOO_ENV_ID = siteConfig('COMMENT_TWIKOO_ENV_ID')
  
  // 使用 useMemo 优化 CDN 域名解析
  const cdnDomain = useMemo(() => {
    try {
      return new URL(COMMENT_TWIKOO_CDN_URL).origin
    } catch (e) {
      return 'https://cdn.jsdelivr.net'
    }
  }, [COMMENT_TWIKOO_CDN_URL])

  return (
    <Head>
      {/* DNS 预解析 */}
      <link rel="dns-prefetch" href={cdnDomain} key="dns-prefetch" />
      
      {/* 预连接 - 包含 DNS 预解析、TCP 握手和 TLS 协商 */}
      <link 
        rel="preconnect" 
        href={cdnDomain} 
        crossOrigin="anonymous" 
        key="preconnect"
      />
      
      {/* 如果评论区即将可见，预加载 Twikoo 脚本 */}
      {shouldLoad && COMMENT_TWIKOO_ENV_ID && (
        <link 
          rel="preload" 
          href={COMMENT_TWIKOO_CDN_URL} 
          as="script" 
          crossOrigin="anonymous"
          key="preload-twikoo"
        />
      )}
    </Head>
  )
})

TwikooResourceLoader.displayName = 'TwikooResourceLoader'

export default TwikooResourceLoader 