#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import extractCommand from "./cmds/extract.js";
import infoCommand from "./cmds/info.js";

yargs(hideBin(process.argv))
  .usage("Usage: $0 <command> [options]")
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .command(infoCommand)
  .command(extractCommand)
  .example("$0 info ~/manhuaren/", "list comics in folder")
  .example(
    "$0 extract ~/manhuaren/ ~/out -z",
    "extract comics in ~/manhuaren/ as zip files in ~/out",
  )
  .demandCommand(1)
  .wrap(null)
  .strict()
  .parse();
