const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [args]')
    .command({
        command: 'projects <username>',
        desc: 'get all projects from the username entered',
        builder: (yargs) => {
            return yargs.option('t', {
                alias: 'token',
                describe: 'enter your Github Access Token',
                type: 'string'
            })
        },
        handler: (argv) => { app.projects(argv.username, argv.token) }
    })
    .command({
      command: 'search <projectId>',
      desc: 'search for a project using its id',
      builder: (yargs) => {
          return yargs.option('t', {
              alias: 'token',
              describe: 'enter your Github Access Token',
              type: 'string'
          })
      },
      handler: (argv) => { app.project(argv.projectId, argv.token) }
    })

    .help('help')
    .argv
