import { siteConfig } from '@/lib/config'
import { convertInnerUrl } from '@/lib/notion/convertInnerUrl'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GlobalStyle } from './GlobalStyle'
import { initGoogleAdsense } from './GoogleAdsense'

import Head from 'next/head'
import ExternalScript from './ExternalScript'
import WebWhiz from './Webwhiz'

/**
 * 各种插件脚本
 * @param {*} props
 * @returns
 */
const ExternalPlugin = props => {
  // 读取自Notion的配置
  const { NOTION_CONFIG } = props
  const DISABLE_PLUGIN = siteConfig('DISABLE_PLUGIN', null, NOTION_CONFIG)
  const THEME_SWITCH = siteConfig('THEME_SWITCH', null, NOTION_CONFIG)
  const DEBUG = siteConfig('DEBUG', null, NOTION_CONFIG)
  const ANALYTICS_ACKEE_TRACKER = siteConfig(
    'ANALYTICS_ACKEE_TRACKER',
    null,
    NOTION_CONFIG
  )
  const ANALYTICS_VERCEL = siteConfig('ANALYTICS_VERCEL', null, NOTION_CONFIG)
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig(
    'ANALYTICS_BUSUANZI_ENABLE',
    null,
    NOTION_CONFIG
  )
  const ADSENSE_GOOGLE_ID = siteConfig('ADSENSE_GOOGLE_ID', null, NOTION_CONFIG)
  const FACEBOOK_APP_ID = siteConfig('FACEBOOK_APP_ID', null, NOTION_CONFIG)
  const FACEBOOK_PAGE_ID = siteConfig('FACEBOOK_PAGE_ID', null, NOTION_CONFIG)
  const FIREWORKS = siteConfig('FIREWORKS', null, NOTION_CONFIG)
  const SAKURA = siteConfig('SAKURA', null, NOTION_CONFIG)
  const STARRY_SKY = siteConfig('STARRY_SKY', null, NOTION_CONFIG)
  const MUSIC_PLAYER = siteConfig('MUSIC_PLAYER', null, NOTION_CONFIG)
  const NEST = siteConfig('NEST', null, NOTION_CONFIG)
  const FLUTTERINGRIBBON = siteConfig('FLUTTERINGRIBBON', null, NOTION_CONFIG)
  const COMMENT_TWIKOO_COUNT_ENABLE = siteConfig(
    'COMMENT_TWIKOO_COUNT_ENABLE',
    null,
    NOTION_CONFIG
  )
  const RIBBON = siteConfig('RIBBON', null, NOTION_CONFIG)
  const CUSTOM_RIGHT_CLICK_CONTEXT_MENU = siteConfig(
    'CUSTOM_RIGHT_CLICK_CONTEXT_MENU',
    null,
    NOTION_CONFIG
  )
  const CAN_COPY = siteConfig('CAN_COPY', null, NOTION_CONFIG)
  const WEB_WHIZ_ENABLED = siteConfig('WEB_WHIZ_ENABLED', null, NOTION_CONFIG)
  const AD_WWADS_BLOCK_DETECT = siteConfig(
    'AD_WWADS_BLOCK_DETECT',
    null,
    NOTION_CONFIG
  )
  const CHATBASE_ID = siteConfig('CHATBASE_ID', null, NOTION_CONFIG)
  const AD_WWADS_ID = siteConfig('AD_WWADS_ID', null, NOTION_CONFIG)
  const ANALYTICS_BAIDU_ID = siteConfig('ANALYTICS_BAIDU_ID', null, NOTION_CONFIG)
  const ANALYTICS_CNZZ_ID = siteConfig('ANALYTICS_CNZZ_ID', null, NOTION_CONFIG)
  const ANALYTICS_GOOGLE_ID = siteConfig('ANALYTICS_GOOGLE_ID', null, NOTION_CONFIG)
  const MATOMO_HOST_URL = siteConfig('MATOMO_HOST_URL', null, NOTION_CONFIG)
  const MATOMO_SITE_ID = siteConfig('MATOMO_SITE_ID', null, NOTION_CONFIG)
  const ANALYTICS_51LA_ID = siteConfig('ANALYTICS_51LA_ID', null, NOTION_CONFIG)
  const ANALYTICS_51LA_CK = siteConfig('ANALYTICS_51LA_CK', null, NOTION_CONFIG)
  const DIFY_CHATBOT_ENABLED = siteConfig('DIFY_CHATBOT_ENABLED', null, NOTION_CONFIG)
  const TIANLI_KEY = siteConfig('TianliGPT_KEY', null, NOTION_CONFIG)
  const GLOBAL_JS = siteConfig('GLOBAL_JS', '', NOTION_CONFIG)
  const CLARITY_ID = siteConfig('CLARITY_ID', null, NOTION_CONFIG)
  const IMG_SHADOW = siteConfig('IMG_SHADOW', null, NOTION_CONFIG)
  const ANIMATE_CSS_URL = siteConfig('ANIMATE_CSS_URL', null, NOTION_CONFIG)
  const MOUSE_FOLLOW = siteConfig('MOUSE_FOLLOW', null, NOTION_CONFIG)
  const CUSTOM_EXTERNAL_CSS = siteConfig(
    'CUSTOM_EXTERNAL_CSS',
    null,
    NOTION_CONFIG
  )
  const CUSTOM_EXTERNAL_JS = siteConfig(
    'CUSTOM_EXTERNAL_JS',
    null,
    NOTION_CONFIG
  )
  // 默认关闭NProgress
  const ENABLE_NPROGRSS = siteConfig('ENABLE_NPROGRSS', false)
  const COZE_BOT_ID = siteConfig('COZE_BOT_ID')
  const HILLTOP_ADS_META_ID = siteConfig(
    'HILLTOP_ADS_META_ID',
    null,
    NOTION_CONFIG
  )

  // 自定义样式css和js引入
  if (isBrowser) {
    // 初始化AOS动画
    // 静态导入本地自定义样式
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')

    // 自动添加图片阴影
    if (IMG_SHADOW) {
      loadExternalResource('/css/img-shadow.css', 'css')
    }

    if (ANIMATE_CSS_URL) {
      loadExternalResource(ANIMATE_CSS_URL, 'css')
    }

    // 导入外部自定义脚本
    if (CUSTOM_EXTERNAL_JS && CUSTOM_EXTERNAL_JS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }

    // 导入外部自定义样式
    if (CUSTOM_EXTERNAL_CSS && CUSTOM_EXTERNAL_CSS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
  }

  const router = useRouter()
  useEffect(() => {
    // 异步渲染谷歌广告
    if (ADSENSE_GOOGLE_ID) {
      setTimeout(() => {
        initGoogleAdsense(ADSENSE_GOOGLE_ID)
      }, 3000)
    }

    setTimeout(() => {
      // 将notion-id格式的url转成自定义slug
      convertInnerUrl(props?.allNavPages)
    }, 500)
  }, [router])

  useEffect(() => {
    // 执行注入脚本
    // eslint-disable-next-line no-eval
    eval(GLOBAL_JS)
  }, [])

  if (DISABLE_PLUGIN) {
    return null
  }

  return (
    <>
      {/* 全局样式嵌入 */}
      <GlobalStyle />
      {MOUSE_FOLLOW && <MouseFollow />}
      {THEME_SWITCH && <ThemeSwitch />}
      {DEBUG && <DebugPanel />}
      {ANALYTICS_ACKEE_TRACKER && <Ackee />}
      {ANALYTICS_GOOGLE_ID && <Gtag />}
      {ANALYTICS_VERCEL && <Analytics />}
      {ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
      {FACEBOOK_APP_ID && FACEBOOK_PAGE_ID && <Messenger />}
      {FIREWORKS && <Fireworks />}
      {SAKURA && <Sakura />}
      {STARRY_SKY && <StarrySky />}
      {MUSIC_PLAYER && <MusicPlayer />}
      {NEST && <Nest />}
      {FLUTTERINGRIBBON && <FlutteringRibbon />}
      {COMMENT_TWIKOO_COUNT_ENABLE && <TwikooCommentCounter {...props} />}
      {RIBBON && <Ribbon />}
      {DIFY_CHATBOT_ENABLED && <DifyChatbot />}
      {CUSTOM_RIGHT_CLICK_CONTEXT_MENU && <CustomContextMenu {...props} />}
      {!CAN_COPY && <DisableCopy />}
      {WEB_WHIZ_ENABLED && <WebWhiz />}
      {AD_WWADS_BLOCK_DETECT && <AdBlockDetect />}
      {TIANLI_KEY && <TianliGPT />}
      <VConsole />
      {ENABLE_NPROGRSS && <LoadingProgress />}
      <AOSAnimation />
      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && <LA51 />}
      {COZE_BOT_ID && <Coze />}

      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && (
        <>
          <script id='LA_COLLECT' src='//sdk.51.la/js-sdk-pro.min.js' defer />
        </>
      )}

      {CHATBASE_ID && (
        <>
          <script
            id={CHATBASE_ID}
            src='https://www.chatbase.co/embed.min.js'
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                    window.chatbaseConfig = {
                        chatbotId: "${CHATBASE_ID}",
                        }
                    `
            }}
          />
        </>
      )}

      {CLARITY_ID && (
        <>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function(c, l, a, r, i, t, y) {
                  c[a] = c[a] || function() {
                    (c[a].q = c[a].q || []).push(arguments);
                  };
                  t = l.createElement(r);
                  t.async = 1;
                  t.src = "https://www.clarity.ms/tag/" + i;
                  y = l.getElementsByTagName(r)[0];
                  if (y && y.parentNode) {
                    y.parentNode.insertBefore(t, y);
                  } else {
                    document.body.appendChild(t);
                  }
                })(window, document, "clarity", "script", "${CLARITY_ID}");
                `
            }}
          />
        </>
      )}

      {/* 百度统计 */}
      {ANALYTICS_BAIDU_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${ANALYTICS_BAIDU_ID}";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
          `
          }}
        />
      )}

      {/* 站长统计 */}
      {ANALYTICS_CNZZ_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_${ANALYTICS_CNZZ_ID}'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D${ANALYTICS_CNZZ_ID}' type='text/javascript'%3E%3C/script%3E"));
          `
          }}
        />
      )}

      {/* 谷歌统计 */}
      {ANALYTICS_GOOGLE_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GOOGLE_ID}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${ANALYTICS_GOOGLE_ID}', {
                      page_path: window.location.pathname,
                    });
                    `
            }}
          />
        </>
      )}

      {/* Matomo 统计 */}
      {MATOMO_HOST_URL && MATOMO_SITE_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//${MATOMO_HOST_URL}/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `
          }}
        />
      )}

      {/* 广告植入 */}
      {HILLTOP_ADS_META_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
            (function(__htas){
              var d = document,
                  s = d.createElement('script'),
                  l = d.scripts[d.scripts.length - 1];
              s.settings = __htas || {};
              s.src = "//appsha1.hotelscombiapp.com/"+__htas.meta_id+".js";
              l.parentNode.insertBefore(s, l);
            })({meta_id: '${HILLTOP_ADS_META_ID}'});
          `
          }}
        />
      )}

      {/* 广告植入 */}
      {AD_WWADS_ID && (
        <>
          <script
            async
            type='text/javascript'
            src='https://cdn.wwads.cn/js/makemoney.js'
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  var el = document.createElement("script");
                  el.src = "https://cdn.wwads.cn/js/macro.js";
                  el.onload=function(){window.WWAds.register('${AD_WWADS_ID}')};
                  document.getElementsByTagName("head")[0].appendChild(el)
                })()
                `
            }}
          />
        </>
      )}

      <Head>
        {/* 自定义外部脚本 */}
        <ExternalScript />
      </Head>
    </>
  )
}

const TwikooCommentCounter = dynamic(
  () => import('@/components/TwikooCommentCounter'),
  { ssr: false }
)
const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
  ssr: false
})
const ThemeSwitch = dynamic(() => import('@/components/ThemeSwitch'), {
  ssr: false
})
const Fireworks = dynamic(() => import('@/components/Fireworks'), {
  ssr: false
})
const MouseFollow = dynamic(() => import('@/components/MouseFollow'), {
  ssr: false
})
const Nest = dynamic(() => import('@/components/Nest'), { ssr: false })
const FlutteringRibbon = dynamic(
  () => import('@/components/FlutteringRibbon'),
  { ssr: false }
)
const Ribbon = dynamic(() => import('@/components/Ribbon'), { ssr: false })
const Sakura = dynamic(() => import('@/components/Sakura'), { ssr: false })
const StarrySky = dynamic(() => import('@/components/StarrySky'), {
  ssr: false
})
const DifyChatbot = dynamic(() => import('@/components/DifyChatbot'), {
  ssr: false
})
const Analytics = dynamic(
  () =>
    import('@vercel/analytics/react').then(async m => {
      return m.Analytics
    }),
  { ssr: false }
)
const MusicPlayer = dynamic(() => import('@/components/Player'), { ssr: false })
const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const Messenger = dynamic(() => import('@/components/FacebookMessenger'), {
  ssr: false
})
const VConsole = dynamic(() => import('@/components/VConsole'), { ssr: false })
const CustomContextMenu = dynamic(
  () => import('@/components/CustomContextMenu'),
  { ssr: false }
)
const DisableCopy = dynamic(() => import('@/components/DisableCopy'), {
  ssr: false
})
const AdBlockDetect = dynamic(() => import('@/components/AdBlockDetect'), {
  ssr: false
})
const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), {
  ssr: false
})
const AOSAnimation = dynamic(() => import('@/components/AOSAnimation'), {
  ssr: false
})
const LA51 = dynamic(() => import('@/components/LA51'), { ssr: false })
const TianliGPT = dynamic(() => import('@/components/TianliGPT'), { ssr: false })
const Coze = dynamic(() => import('@/components/Coze'), { ssr: false })

export default ExternalPlugin
