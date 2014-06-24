'use strict';

var os = require('os'),
    exec = require('child_process').exec,
    serverPort = 9000,
    env = process.env['NODE_ENV'] || false;

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var buildConfigMain = grunt.file.readJSON('tools/build.js'),
        pathBuildDoc = 'build/',
        pathDevDoc = 'dev/',
        pathDevJs = pathDevDoc + 'js/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            buildDoc: pathBuildDoc,
            devDoc: pathDevDoc,
            devJs: pathDevJs,
        },
        jshint: {
            app: {
                files: {
                    src: [pathDevJs + '**/*.js']
                },
                options: {
                    jshintrc: '.jshintrc',
                    ignores: [
                        pathDevJs + 'lib/**/*.js'
                    ]
                }
            }
        },
        compass: {
            app: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        connect: {
            dev: buildConnect(serverPort, '*', false, 9666, true, pathDevDoc),
            build: buildConnect(serverPort, '*', true, false, false, pathBuildDoc)
        },
        jade: {
            prod: {
                options: {
                    data: {
                        "prod": true
                    }
                },
                files: {
                    '<%= paths.devDoc %>index.html': 'templates/index.jade'
                }
            },
            index: {
                options: {
                    data: {
                        "prod": env === 'prod' ? true : false
                    }
                },
                files: {
                    '<%= paths.devDoc %>index.html': 'templates/index.jade'
                }
            },
            preview: {
                options: {
                    pretty: true,
                    data: grunt.file.readJSON('data/lista.json')
                },
                files: [{
                    '<%= paths.devDoc %>telas/preview/lista.html': 'templates/telas/preview/lista.jade'
                }, {
                    '<%= paths.devDoc %>telas/preview/login.html': 'templates/telas/preview/login.jade'
                }, {
                    '<%= paths.devDoc %>telas/preview/fechamento.html': 'templates/telas/preview/fechamento.jade'
                }, {
                    '<%= paths.devDoc %>telas/preview/fechamento-varia.html': 'templates/telas/preview/fechamento-varia.jade'
                }, {
                    '<%= paths.devDoc %>telas/preview/inicial.html': 'templates/telas/preview/inicial.jade'
                }]
            },
            modules: {
                options: {
                    pretty: true,
                    data: grunt.file.readJSON('data/lista.json')
                },
                files: [{
                    '<%= paths.devDoc %>js/modules/telas/view/lista.html': 'templates/telas/lista.jade'
                }, {
                    '<%= paths.devDoc %>remote.html': 'templates/telas/remote.jade'
                }]
            }
        },
        watch: {
            sass: {
                files: ['sass/**/*.sass'],
                tasks: ['compass'],
                options: {
                    livereload: 9666
                }
            },
            autoprefixer: {
                files: [pathDevDoc + 'css/main.css'],
                tasks: ['shell:prefixer'],
            },
            scripts: {
                files: [pathDevDoc + 'js/**/*.js'],
                tasks: ['jshint:app'],
                options: {
                    interrupt: true
                }
            },
            jade: {
                files: ['templates/**/*.jade', 'data/**/*.json'],
                tasks: ['jade'],
                options: {
                    interrupt: true
                }
            }
        },
        shell: {
            prefixer: {
                command: [
                    'autoprefixer -o ' + pathDevDoc + 'css/main.prefixer.css ' + pathDevDoc + 'css/main.css'
                ].join(' ; '),
                options: {
                    stdout: true
                }
            },
            build: {
                command: [
                    'rm -rf ' + pathBuildDoc,
                    'mkdir -p ' + pathBuildDoc,
                    'cp -r ' + pathDevDoc + '. ' + pathBuildDoc + '.',
                    'rm -rf ' + pathBuildDoc + 'js/*',
                    'cp ' + pathDevDoc + 'js/webApp.build.* ' + pathBuildDoc + 'js/.',
                    'cp ' + pathDevDoc + 'js/util.webFont.js ' + pathBuildDoc + 'js/.',
                    'rm ' + pathDevDoc + 'js/webApp.build.*'
                ].join(' ; '),
                options: {
                    stdout: true
                }
            }
        },
    });

    grunt.registerTask(
        'requirejs',
        'Run the r.js build script',
        function() {
            var done = this.async(),
                command = (os.platform() == 'win32') ? 'r.js.cmd' : 'r.js';

            exec(command + ' -o ./tools/build.js',
                function(err, stdout, stderr) {
                    if (err) {
                        grunt.fail.fatal('Problem with r.js: ' + err + ' ' + stderr);
                    }
                    grunt.log.writeln(stdout);
                    grunt.log.ok('Build complete.');
                    done();
                }
            );
        }
    );

    grunt.registerTask('default', ['jade', 'compass:app', 'shell:prefixer', 'jshint:app']);
    grunt.registerTask('server', ['default', 'connect:dev', 'watch']);
    grunt.registerTask('build', ['default', 'jade:prod', 'requirejs', 'shell:build']);
};

function buildConnect(port, hostname, keepalive, livereload, debug, base, open) {
    var o = {
        'options': {
            'port': port || 9000,
            'hostname': hostname || '*',
            'keepalive': keepalive || false,
            'livereload': livereload || false,
            'debug': debug || false,
            'base': base,
            'open': open || 'http://localhost:' + port + '/'
        }
    }
    return o;
}
