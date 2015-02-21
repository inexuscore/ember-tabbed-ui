module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        emberTemplates: {
            compile: {
                options: {
                    templateCompilerPath: 'bower_components/ember/ember-template-compiler.js',
                    handlebarsPath: 'node_modules/handlebars/dist/handlebars.js',
                    templateNamespace: 'HTMLBars',
                    templateBasePath: /app\/templates\//
                },
                files: {
                    'app/scripts/templates.js': ['app/templates/**/*.hbs']
                }
            }
        },
        watch: {
            emberTemplates: {
                files: 'app/templates/**/*.hbs',
                tasks: ['emberTemplates']
            }
        }
    });

    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['emberTemplates', 'watch']);
}
