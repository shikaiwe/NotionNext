import Head from 'next/head'
import { siteConfig } from '@/lib/config'

const TwikooResourceLoader = ({ shouldLoad }) => {
  const COMMENT_TWIKOO_CDN_URL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const COMMENT_TWIKOO_ENV_ID = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const cdnDomain = 'https://cdn.jsdelivr.net'

  return (
    <Head>
      {/* DNS 预解析 */}
      <link rel="dns-prefetch" href={cdnDomain} />
      
      {/* 预连接 - 包含 DNS 预解析、TCP 握手和 TLS 协商 */}
      <link rel="preconnect" href={cdnDomain} crossOrigin="anonymous" />
      
      {/* 如果评论区即将可见，预加载 Twikoo 脚本 */}
      {shouldLoad && COMMENT_TWIKOO_ENV_ID && (
        <link 
          rel="preload" 
          href={COMMENT_TWIKOO_CDN_URL} 
          as="script" 
          crossOrigin="anonymous"
        />
      )}
    </Head>
  )
}

export default TwikooResourceLoader 