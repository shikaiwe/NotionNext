import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Image from 'next/image'
import { memo } from 'react'

const TwikooImage = memo(({ src, alt, width, height, className }) => {
  // 检查是否是 base64 图片
  const isBase64 = src?.startsWith('data:')
  
  // 检查是否是外部图片
  const isExternal = src?.startsWith('http') || src?.startsWith('//')

  // 设置默认尺寸
  const defaultWidth = width || 'auto'
  const defaultHeight = height || 'auto'

  if (isBase64) {
    return (
      <img
        src={src}
        alt={alt}
        width={defaultWidth}
        height={defaultHeight}
        className={className}
        loading="lazy"
        decoding="async"
      />
    )
  }

  // 对于外部图片使用 LazyLoadImage
  if (isExternal) {
    return (
      <LazyLoadImage
        src={src}
        alt={alt}
        width={defaultWidth}
        height={defaultHeight}
        effect="blur"
        className={className}
        placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
        wrapperClassName="lazy-load-image-wrapper"
        threshold={100}
        delayMethod="throttle"
        delayTime={300}
      />
    )
  }

  // 对于内部图片使用 Next/Image
  return (
    <Image
      src={src}
      alt={alt}
      width={parseInt(width) || 800}
      height={parseInt(height) || 600}
      className={className}
      loading="lazy"
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
    />
  )
})

TwikooImage.displayName = 'TwikooImage'

export default TwikooImage 