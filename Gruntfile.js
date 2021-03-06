/*global module:false*/
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  var deployFolder = 'deploy/release/';
  var debugFolder = 'deploy/debug/';

  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: ['deploy/'],

    jshint: {
      options: {
        browser: true,
        curly: true,
        scripturl: true,
        forin: true,
        jquery: true,
        noempty: true,
        boss: true,
        indent: 2,
        latedef: true,
        eqeqeq: true,
        undef: true,
        devel: false,
        strict: true,
        trailing: false,
        smarttabs: false,
        quotmark: 'single',
        immed: true,
        newcap: true,
        noarg: true,
        eqnull: true,
        globals: {
          define: true,
          require: true,
          Backbone: true,
          console: true,
          _: true,
          global: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: 'app/**/*.js'
      }
    },

    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: [
          'assets/js/libs/almond.js',
          debugFolder + 'templates.js',
          debugFolder + '<%= pkg.name %>.js'
        ],
        dest: deployFolder + '<%= pkg.name %>.js',
        separator: ';'
      }
    },

    sass: {
      options: {
        'debug-info': true,
        compass: true
      },
      deploy: {
        files: {
          'assets/generated/main.css': 'assets/scss/main.scss'
        }
      }
    },

    cssmin: {
      deploy: {
        src: [
          'assets/vendor/css/normalize.css',
          'assets/generated/main.css'
        ],
        dest: 'deploy/release/assets/generated/main.css'
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'app/**/*.js',
        tasks: ['jshint']
      }
    },

    jst: {
      'deploy/debug/templates.js': [
        'app/templates/**/*.html'
      ]
    },

    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'app/config.js',
          // Output file.
          out: 'deploy/debug/<%= pkg.name %>.js',
          // Root application module.
          name: 'config',
          // Do not wrap everything in an IIFE.
          wrap: false,
          optimize: 'none'
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          src: ['mock/**/*'],
          dest: 'deploy/release/'
        }, {
          expand: true,
          src: ['assets/images/*'],
          dest: 'deploy/release/'
        }, {
          expand: true,
          src: ['assets/fonts/*'],
          dest: 'deploy/release'
        }, {
          expand: false,
          src: ['index-release.html'],
          dest: 'deploy/release/index.html'
        }, {
          expand: true,
          src: ['assets/css/*'],
          dest: 'deploy/release'
        }]
      }
    },

    uglify: {
      app: {
        files: {
          'deploy/release/<%= pkg.name %>.js': [
            'deploy/release/<%= pkg.name %>.js'
          ]
        }
      }
    },

    exec: {
      deployToServer: {
        cmd: function() {
          return 'scp -ri /Users/ivan/.ssh/kljuc.pem deploy/release/* ubuntu@54.194.77.228:/home/ubuntu/apache-tomcat-7.0.47/webapps/relsem';
        }
      }
    },

    compress: {
      main: {
        options: {
          archive: 'deploy/<%= pkg.name %>.zip'
        },
        files: [{
          expand: true,
          cwd: deployFolder,
          src: ['**'],
          dest: '.'
        }]
      }
    },

    connect: {
      server: {
        options: {
          hostname: '*'
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('debug', ['jshint', 'clean', 'jst', 'requirejs']);
  grunt.registerTask('release', ['debug', 'concat', 'uglify', 'sass', 'cssmin', 'copy']);
  grunt.registerTask('zip', ['release', 'compress']);
  grunt.registerTask('deploy', ['release', 'exec']);
  grunt.registerTask('default', ['jshint', 'sass', 'connect', 'watch']);
  grunt.registerTask('scpToServer', ['exec:deployToServer']);

};