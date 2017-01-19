#!/usr/bin/env node
require('yargs')
  .usage('Usage: $0 <command> [options]')
  .version()
  .alias('v', 'version')
  .help()
  .alias('h', 'help')
  .commandDir('./cmds/')
  .example('$0 info ~/manhuaren/', 'list comics in folder')
  .example('$0 extract ~/manhuaren/ ~/out -z', 'extract comics in ~/manhuaren/ as zip files in ~/out')
  .demand(1)
  .wrap(null)
  .strict()
  .argv;
