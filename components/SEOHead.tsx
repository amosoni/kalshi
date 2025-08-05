import Head from 'next/head';

type SEOHeadProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
};

export default function SEOHead({
  title = 'Kalshi AI - 免费AI视频背景移除工具',
  description = 'Kalshi AI提供免费的AI视频背景移除服务，支持MP4、MOV、AVI等格式，快速去除视频背景，无需下载软件。',
  keywords = ['AI视频背景移除', '视频背景去除', '在线视频编辑', 'AI视频处理'],
  image = '/og-image.png',
  url = 'https://www.kalshiai.org',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Kalshi AI Team',
}: SEOHeadProps) {
  const fullTitle = title.includes('Kalshi AI') ? title : `${title} | Kalshi AI`;

  return (
    <Head>
      {/* 基础SEO标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />

      {/* 规范链接 */}
      <link rel="canonical" href={url} />

      {/* Open Graph标签 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kalshi AI" />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kalshiai" />
      <meta name="twitter:creator" content="@kalshiai" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 文章特定标签 */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Kalshi AI" />

      {/* 主题色 */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />

      {/* 预连接优化 */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://hm.baidu.com" />

      {/* DNS预取 */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//hm.baidu.com" />
    </Head>
  );
}
