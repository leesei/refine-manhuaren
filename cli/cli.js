#!/usr/bin/env node
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .command(require('./info'))
    .example('$0 info ~/manhuaren/', 'list comics in folder')
    .command(require('./extract'))
    .example('$0 extract ~/manhuaren/ ~/out -z', 'extract comics in ~/manhuaren/ as zip files in ~/out')
    .demand(1)
    .wrap(null)
    .argv;
