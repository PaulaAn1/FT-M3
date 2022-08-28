/* const commands = require('./commands/index.js')

const cmd = 'pwd';
commands[cmd]();
console.log(process);
 */
/* process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
      var cmd = data.toString().trim(); // remueve la nueva línea
      process.stdout.write('You typed: ' + cmd);
      process.stdout.write('\nprompt > ');
    }); */

const commands = require('./commands');

const done = function(output) {
  process.stdout.write(output)
  process.stdout.write('\nprompt > ')
  // muestra el prompt
}
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' ')
  var cmd = args[0] // remueve la nueva línea
  /* if(cmd === 'date') {
    commands.date() 
  }
  if(cmd === 'pwd') {
    commands.pwd()
  }  */
  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](args, done);
  } 
});