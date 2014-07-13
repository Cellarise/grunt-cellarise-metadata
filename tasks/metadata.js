var path = require('path');

module.exports = function (grunt) {
    grunt.registerTask("metadata", "Task to populate build properties into npm package.json.", function () {
        var packageJSON,
            //done = this.async(),
            opts = this.options(),
            metaData = opts.metaData,
            filepath = path.resolve(opts.package ? opts.package : './Source/package.json'),
            Date = global.Date;

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            //done();
            return false;
        } else {
            grunt.log.ok("Reading file: " + filepath);
            packageJSON = grunt.file.readJSON(filepath);
            //set attributes based on environment
            packageJSON.version = metaData.VERSION && metaData.VERSION !== "DEV" ? metaData.VERSION : packageJSON.version;
            packageJSON.config.build = metaData.BUILD ? metaData.BUILD : "n/a";
            packageJSON.config.buildTimestamp = metaData.BUILD_TIME ? metaData.BUILD_TIME : new Date().toISOString();

            grunt.log.ok("Updating file: " + filepath);
            grunt.file.write(filepath, JSON.stringify(packageJSON, null, 4));
            //done();
            return true;
        }
    });
};

