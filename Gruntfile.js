'use strict';

var os = require('os'),
    exec = require('child_process').exec,
    serverPort = 9000;

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
        clean: {
            app: {
                src: [pathBuildDoc]
            },
            end: {
                src: [pathBuildDoc + 'js/templates']
            }
        },
        jshint: {
            app: {
                files: {
                    src: [pathDevJs + '**/*.js']
                },
                options: {
                    jshintrc: '.jshintrc',
                    ignores: [pathDevJs + 'lib/**/*.js']
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
            index: {
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
                    '<%= paths.devDoc %>preview/lista.html': 'templates/preview/lista.jade'
                }, {
                    '<%= paths.devDoc %>preview/login.html': 'templates/preview/login.jade'
                }]
            },
            modules: {
                options: {
                    pretty: true,
                    data: grunt.file.readJSON('data/lista.json')
                },
                files: {
                    '<%= paths.devDoc %>js/modules/telas/view/lista.html': 'templates/telas/lista.jade'
                }
            }
        },
        // grunticon: {
        //     app: {
        //         files: [{
        //             expand: true,
        //             cwd: devDoc + 'images/icons/src',
        //             src: ['*.svg', '*.png'],
        //             dest: devDoc + 'images/icons'
        //         }],
        //         options: {
        //             customselectors: {
        //                 "*": [".icon-$1:before"]
        //             }
        //         }
        //     }
        // },
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
    grunt.registerTask('default', ['clean:app', 'jade', 'compass:app', 'shell:prefixer', 'jshint:app']);
    grunt.registerTask('server', ['default', 'connect:dev', 'watch']);
    // grunt.registerTask('build', ['default', 'requirejs', 'clean:end']);
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
