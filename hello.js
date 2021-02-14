var catMe = require('cat-me')

const chalk = require('chalk');






module.exports = function cat (){
var cat = catMe();
console.log(chalk.magentaBright.bgYellowBright.bold(cat))
}

