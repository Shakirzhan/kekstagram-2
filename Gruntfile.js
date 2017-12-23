module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    //удалить все из папки build
    clean: {
      build: ["build"]
    },

    //копирование всех
    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      },
      img: {
        files: [{
          expand: true,
          src: ["img/**"],
          dest: "build"
        }]
      },
      js: {
        files: [{
          expand: true,
          src: ["js/**"],
          dest: "build"
        }]
      }
    },


    //компиляция препроцессора
    less: {
      style: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },
    //автопрефиксер и объединение медиавыражений
    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 2 versions"
            ]}),
            require("css-mqpacker")({
              sort: true })
          ]
        },
        src: "build/css/*.css"
      }
    },
    //минимизируем css
    csso: {
      style: {
        options: {
          report: "gzip"
          },
          files: {
            "build/css/style.min.css": ["build/css/style.css"]
          }
        }
      },

    //домашний сервер
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    //слежение за файлами
    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    },


    //сжатие картинок
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    //сжатие svg
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/icons/*.svg"]
        }]
      }
    },

    //svg спрайт
    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["build/img/icons/*.svg"]
        }
      }
    },

    // публикация на GitHub Pages (http://ichernobuk.github.io/РЕПОЗИТОРИЙ/)
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**/*'
    }

  });
  //сервер и слежение
  grunt.registerTask("serve", ["browserSync", "watch"]);
  //картинки и svg
  grunt.registerTask("img", ["imagemin", "svgmin", "svgstore"]);
  //работа
  grunt.registerTask("start", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "serve",
  ]),
  //сборка и публикация
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "img",
    "gh-pages",
  ])
};
