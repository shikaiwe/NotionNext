import { siteConfig } from '@/lib/config'
import { isBrowser, isSearchEngineBot } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { useInView } from 'react-intersection-observer'
import TwikooResourceLoader from './TwikooResourceLoader'

/**
 * 评论组件
 * 只有当前组件在浏览器可见范围内才会加载内容
 * @param {*} param0
 * @returns
 */
const Comment = memo(({ frontMatter, className }) => {
  const router = useRouter()
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  })

  // 当连接中有特殊参数时跳转到评论区
  if (isBrowser && router.query.target === 'comment') {
    setTimeout(() => {
      const url = router.asPath.replace('?target=comment', '')
      history.replaceState({}, '', url)
      document
        ?.getElementById('comment')
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }, 1000)
  }

  if (!frontMatter || isSearchEngineBot || frontMatter?.comment === 'Hide') {
    return null
  }

  const COMMENT_TWIKOO_ENV_ID = siteConfig('COMMENT_TWIKOO_ENV_ID')

  return (
    <>
      <TwikooResourceLoader shouldLoad={inView} />
      
      <div
        key={frontMatter?.id}
        id='comment'
        ref={ref}
        className={`comment mt-5 text-gray-800 dark:text-gray-300 ${className || ''}`}>
        {!inView ? (
          <div className='text-center'>
            <span className='loading'>Loading</span>
            <i className='fas fa-spinner animate-spin text-3xl' />
          </div>
        ) : COMMENT_TWIKOO_ENV_ID && (
          <div key='Twikoo'>
            <TwikooComponent />
          </div>
        )}
      </div>
    </>
  )
})

// 使用 memo 包裹动态导入的组件
const TwikooComponent = memo(dynamic(
  () => import('@/components/Twikoo'),
  { 
    ssr: false,
    loading: () => (
      <div className='text-center'>
        <span className='loading'>Loading Twikoo</span>
        <i className='fas fa-spinner animate-spin text-3xl' />
      </div>
    )
  }
))

Comment.displayName = 'Comment'
TwikooComponent.displayName = 'TwikooComponent'

export default Comment
