var jsonfile = require('jsonfile');
var chalk = require('chalk');
var request = require('request');
var lodash = require('request');
var localFileName = './package.json';

function logerr(e) {
    console.error(chalk.bold.red(e));
}
function reverse_merge(obj1, obj2) {
    return _.assign(obj2, obj1)
}
function merge(obj1, obj2) {
    return _.assign(obj1, obj2)
}




module.exports.merger = function (file, url) {

    jsonfile.readFile(localFileName, function (err, obj) {
        if (err) {
            console.error(chalk.bold.red(err));
            return;
        }

        request(
            url,
            function (err, response, body) {
                if (err) return logerr(err);
                else if (!err && response.statusCode == 200) {
                    var latest = JSON.parse(body);
                    var updatedJson = Object.assign({}, obj);
                    updatedJson["devDependencies"] = merge_options(
                        updatedJson["devDependencies"], latest["devDependencies"]);
                    jsonfile.writeFile(localFileName, updatedJson, {spaces: 2}, logerr);
                }
            });
    });

}