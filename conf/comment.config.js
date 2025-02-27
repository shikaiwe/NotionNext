/**
 * 评论插件配置
 */
module.exports = {
  COMMENT_HIDE_SINGLE_TAB:
    process.env.NEXT_PUBLIC_COMMENT_HIDE_SINGLE_TAB || false, // Whether hide the tab when there's no tabs. 只有一个评论组件时是否隐藏切换组件的标签页

  // twikoo
  COMMENT_TWIKOO_ENV_ID: process.env.NEXT_PUBLIC_COMMENT_ENV_ID || '', // TWIKOO后端地址 腾讯云环境填envId；Vercel环境填域名，教程：https://tangly1024.com/article/notionnext-twikoo
  COMMENT_TWIKOO_COUNT_ENABLE:
    process.env.NEXT_PUBLIC_COMMENT_TWIKOO_COUNT_ENABLE || false, // 博客列表是否显示评论数
  COMMENT_TWIKOO_CDN_URL:
    process.env.NEXT_PUBLIC_COMMENT_TWIKOO_CDN_URL ||
    'https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.all.min.js', // twikoo客户端cdn
  
  // 性能优化配置
  COMMENT_TWIKOO_DEFER_LOAD: true, // 延迟加载评论区
  COMMENT_TWIKOO_PRELOAD: true, // 预加载评论区资源
  COMMENT_TWIKOO_LAZY_LOAD: true // 懒加载评论区图片
}
