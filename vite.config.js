import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import legacy from '@vitejs/plugin-legacy'
import Inspect from 'vite-plugin-inspect'
import webfontDL from 'vite-plugin-webfont-dl'
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import FullReload from 'vite-plugin-full-reload'
import imageminWebp from 'imagemin-webp'
import imageminOptipng from 'imagemin-optipng'
import { ViteFaviconsPlugin } from 'vite-plugin-favicon'
import imageminJpegRecompress from 'imagemin-jpeg-recompress'
import handlebars from 'vite-plugin-handlebars'
import postcssCombine from 'postcss-combine-media-query'
import sortMediaQueries from 'postcss-sort-media-queries'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    publicDir: resolve(__dirname, 'public'),
    root: resolve(__dirname, 'src/pages/home'),
    server: {
      port: 3000,
      strictPort: true,
    },
    preview: {
      port: 3003,
      strictPort: true,
    },
    plugins: [
      FullReload('./**/*', { delay: 0 }),
      webfontDL(
        [
          'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Clicker+Script&display=swap',
        ],
        {
          injectAsStyleTag: true, // вставляти завантажені стилі шрифтів як тег <style> безпосередньо у html документ.
          minifyCss: true, // мініфікувати CSS перед вставкою
          async: true, // Асинхронне завантаження шрифтів
          cache: true, // кешувати завантажені шрифти для подальшого використання
          proxy: false, // використовувати проксі для завантаження шрифтів
        }
      ),
      handlebars({
        reloadOnPartialChange: true,
        partialDirectory: resolve(__dirname, 'src/html/'),
      }),
      legacy({
        targets: ['defaults'],
      }), // для генерації легасі версій JavaScript та CSS для застарілих браузерів, які не підтримують сучасний синтаксис або функціональність.
      viteImagemin({
        root: './',
        exclude: [/favicons\/.*\.png$/],
        skipIfLarger: true,
        clearCache: true,
        plugins: {
          // imageminJpegRecompress працює з великим розміром файлів
          jpg: imageminJpegRecompress({
            accurate: true,
            max: 70,
          }),
          png: imageminOptipng({
            optimizationLevel: 5,
          }),
        },
        makeWebp: {
          plugins: {
            jpg: imageminWebp({
              preset: 'picture',
              sns: 70,
            }),
            png: imageminWebp({
              preset: 'picture',
              sns: 70,
            }),
          },
          formatFilePath: path => path.replace(/\.[^/.]+$/, '') + '.webp',
        },
      }),
      env.VITE_FAVICONS === 'favicons' &&
        ViteFaviconsPlugin({
          logo: './public/vite.svg', // шлях до вихідного зображення, яке буде використане для генерації favicon.
          // outputPath: "./favicons/",
          favicons: {
            appName: JSON.stringify(name), // Назва веб-сайту або додатку (з файлу package.json).
            icons: {
              android: true, // Генерує іконку для Android-пристроїв.
              appleIcon: true, // Генерує іконку для пристроїв Apple.
              appleStartup: true, // Генерує іконку для стартового екрана на пристроях Apple.
              favicons: true, // Генерує стандартні favicon для браузерів.
              windows: true, // Генерує іконку для пристроїв Windows.
              yandex: false, // Відключає генерацію іконок для сервісу Yandex.
            },
          },
        }),
      Inspect(),
      createHtmlPlugin({
        minify: true, // Опція для мініфікації HTML
        collapseWhitespace: true, // Об'єднує всі пробіли та нові рядки
        removeComments: true, // Видаляє всі коментарі з HTML-коду.
        removeEmptyAttributes: true, // Видаляє порожні атрибути з HTML-елементів (наприклад, class="")
        removeRedundantAttributes: true, // Видаляє атрибути, значення яких є за замовчуванням (наприклад, type="text" для <input>).
        minifyCSS: true, // Мініфікує CSS, вбудований у HTML.
        minifyJS: true, // Мініфікує JS, вбудований у HTML.
      }),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer(), // автоматично додає вендорні префікси до CSS правил, щоб забезпечити сумісність з різними браузерами.
          postcssPresetEnv(), // використовувати сучасні функції CSS, які ще не включені в стандарті, але вже підтримуються деякими браузерами.
          postcssCombine(),
          sortMediaQueries({ sort: 'desktop-first' }),
        ],
      },
    },
    build: {
      outDir: resolve(__dirname, 'docs'),
      chunkSizeWarningLimit: 2000, // 2000 байт
      cssCodeSplit: true, // чи слід розділяти CSS код на окремі файли
      // target: "esnext", // використання ES модулів, які дозволяють браузерам завантажувати та кешувати модулі окремо.
      terserOptions: {
        compress: {
          drop_console: true, // Видаляє всі виклики функції console.*.
          dead_code: true, // Видаляє "мертвий" код, тобто код, який не використовується та ніколи не буде використаний.
          unused: true, //  Видаляє непотрібні змінні та функції, які не використовуються в коді.
          arrows: true, // Перетворює вирази-стрілки в більш стислий синтаксис, якщо це можливо.
          conditionals: true, // Зменшує розмір умовних виразів, спрощуючи їх, якщо це можливо.
          booleans: true, // Мінімізує використання логічних значень, замінюючи їх на їх скорочені аналоги, якщо це можливо.
          if_return: true, // Перетворює певні if-блоки на вирази return
          join_vars: true, // Об'єднує послідовно призначені змінні в один вираз
          reduce_funcs: true, // Спрощує виклики функцій, замінюючи їх на більш ефективні конструкції, якщо це можливо.
          reduce_vars: true, // Спрощує обробку змінних, замінюючи їх на більш ефективні конструкції, якщо це можливо.
        },
        mangle: {
          toplevel: true, // Зменшує імена змінних та функцій на рівні глобального обсягу видимості,
        },
        parse: {
          html5_comments: false, // HTML-подібні коментарі будуть видалені під час стиснення коду.
          shebang: false, //  рядок "shebang" (починається з #!) буде вилучений з вихідного коду під час його стиснення
        },
        format: {
          comments: false, // Видаляє всі коментарі
        },
        safari10: true, // Вирішує специфічні проблеми сумісності, пов'язані з Safari 10.
      },
      rollupOptions: {
        input: {
          home: resolve(__dirname, 'src/pages/home/index.html'),
        },
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames: assetInfo => {
            const extType = assetInfo.name?.split('.').pop()
            const assetName = assetInfo.name ? assetInfo.name.toString() : ''

            if (
              ['android-chrome', 'apple-touch', 'coast', 'favicon', 'firefox', 'mstile'].some(keyword =>
                assetName.includes(keyword)
              )
            ) {
              return `favicons/[name].[ext]`
            } else if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(extType ? extType : '')) {
              return `img/[name].[ext]`
            } else if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(extType ? extType : '')) {
              return `fonts/[name].[ext]`
            }

            return `[name].[ext]`
          },
        },
      },
      treeshake: true, // видаляє будь-які частини, які не використовуються.
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@img': resolve(__dirname, './src/assets/img'),
      },
    },
  }
})
