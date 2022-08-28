/* function pwd() {
  
}

function date() {
  
}
fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
  })
  process.stdout.write("prompt > ");
}); */
var fs = require('fs');
const { request } = require('http');

module.exports = {
  date: (args, done) => done(Date()),
  
  pwd: (args, done) => done(process.cwd()),

  ls: (args, done) => {
      fs.readdir('.', function (err, files) {
        if (err) throw err;
        let fileFile = ''
        files.forEach(function(file) {
            fileFile = fileFile + file + "\n";
          done(fileFile)
        })
    });
  },

  echo: (args, done) => {
    done(args.join(' '));
    /* process.stdout.write("prompt > "); */
  },

  cat: (args, done) => {
    fs.readFile(args[0], function(err, data) {
      if (err) throw err;
      done(data);
    })
  },
  head: (args, done) => {
    fs.readFile(args[0], 'utf-8', function(err, data) {
      if (err) throw err;
      let firstFiles = data.split('\n').slice(0, 10).join('\n')
        done(firstFiles);
      
    })
    
  },
  tail: (args, done) => {
    fs.readFile(args[0], 'utf-8', function(err, data) {
      if (err) throw err;
      let firstFiles = data.split('\n').slice(-10).join('\n')
        done(firstFiles);
    })
    
  },
  curl: (args, done) => {
    request(args[0], function(err, respose, body) {
      if (err) throw err;
        done(body);
    })
    
  },
}