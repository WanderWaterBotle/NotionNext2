/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

'use client'

/**
 * 这是一个空白主题，方便您用作创建新主题时的模板，从而开发出您自己喜欢的主题
 * 1. 禁用了代码质量检查功能，提高了代码的宽容度；您可以使用标准的html写法
 * 2. 内容大部分是在此文件中写死，notion数据从props参数中传进来
 * 3. 您可在此网站找到更多喜欢的组件 https://www.tailwind-kit.com/
 */
import { useRouter } from 'next/router'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import { siteConfig } from '@/lib/config'
import CONFIG from './config'
import NotionPage from '@/components/NotionPage'
import Loading from '@/components/Loading'
import { useEffect } from 'react'
import { Style } from './style'
import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { About } from './components/About'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { Team } from './components/Team'
import { Blog } from './components/Blog'
import { Contact } from './components/Contact'
import { Brand } from './components/Brand'
import { Footer } from './components/Footer'
import { BackToTopButton } from './components/BackToTopButton'
import { MadeWithButton } from './components/MadeWithButton'
import { LAYOUT_MAPPINGS } from '@/blog.config'
import { SVG404 } from './components/SVG404'

/**
 * 一些外部js
 */
const loadExternal = async () => {
  await loadExternalResource('https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', 'js');
  // 配合animatecss 实现延时滚动动画，和AOS动画相似
  const WOW = window.WOW;
  if (WOW) {
    new WOW().init();
  }
};

/**
 * 布局框架
 * Landing-2 主题用作产品落地页展示
 * 结合Stripe或者lemonsqueezy插件可以成为saas支付订阅
 * https://play-tailwind.tailgrids.com/
 * @param {*} props
 * @returns
 */
const LayoutBase = (props) => {
  const { children } = props

  useEffect(() => {
    loadExternal()
  }, [])

  return <div id='theme-starter'>
            <Style/>
            <NavBar/>

            {children}

            <Footer/>

            {/* 悬浮按钮 */}
            <BackToTopButton/>
            <MadeWithButton/>
        </div>
}

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  return (
        <>
        <Hero/>
        <Features/>
        <About/>
        <Pricing/>
        <Testimonials/>
        <FAQ/>
        <Team/>
        <Blog/>
        <Contact/>
        <Brand/>
        </>
  )
}

/**
 * 文章详情页布局
 * @param {*} props
 * @returns
 */
const LayoutSlug = (props) => {
  // 如果 是 /article/[slug] 的文章路径则进行重定向到另一个域名
  const router = useRouter()
  if (JSON.parse(siteConfig('LANDING_POST_REDIRECT_ENABLE', null, CONFIG)) && isBrowser && router.route === '/[prefix]/[slug]') {
    const redirectUrl = siteConfig('LANDING_POST_REDIRECT_URL', null, CONFIG) + router.asPath.replace('?theme=landing', '')
    router.push(redirectUrl)
    return <div id='theme-landing'><Loading /></div>
  }

  return <>
        <div id='container-inner' className='mx-auto max-w-screen-lg p-12'>
            <NotionPage {...props} />
        </div>
    </>
}

const LayoutSearch = (props) => <></>
const LayoutArchive = (props) => <></>
const Layout404 = (props) => {
  return <>
     {/* <!-- ====== 404 Section Start --> */}
        <section className="bg-white py-20 dark:bg-dark-2 lg:py-[110px]">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4 md:w-5/12 lg:w-6/12">
                <div className="text-center">
                  <img
                    src="/images/landing-2/404.svg"
                    alt="image"
                    className="max-w-full mx-auto"
                  />
                </div>
              </div>
              <div className="w-full px-4 md:w-7/12 lg:w-6/12 xl:w-5/12">
                <div>
                  <div className="mb-8">
                    <SVG404/>
                  </div>
                  <h3 className="mb-5 text-2xl font-semibold text-dark dark:text-white">
                    We Can't Seem to Find The Page You're Looking For.
                  </h3>
                  <p className="mb-8 text-base text-body-color dark:text-dark-6">
                    Oops! The page you are looking for does not exist. It might have
                    been moved or deleted.
                  </p>
                  <a
                    className="py-3 text-base font-medium text-white transition rounded-md bg-dark px-7 hover:bg-primary"
                  >
                    Go To Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ====== 404 Section End --> */}

    </>
}

const LayoutCategoryIndex = (props) => <></>
const LayoutPostList = (props) => <></>
const LayoutTagIndex = (props) => <></>
/**
 * 根据路径 获取对应的layout
 * @param {*} path
 * @returns
 */
const getLayoutNameByPath = (path) => {
  // 检查特殊处理的路径
  if (LAYOUT_MAPPINGS[path]) {
    return LAYOUT_MAPPINGS[path];
  } else {
    // 没有特殊处理的路径返回默认layout名称
    return 'LayoutSlug';
  }
}

export {
  CONFIG as THEME_CONFIG,
  LayoutBase,
  LayoutIndex,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutPostList,
  LayoutCategoryIndex,
  LayoutTagIndex,
  getLayoutNameByPath
}