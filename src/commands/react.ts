import { Command, Flags } from "@oclif/core";
const loading =  require('loading-cli');
const { exec } = require("child_process");

var execCommand = async (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error: any) => {
      if (error) reject(error);
      resolve("Success");
    });
  });
};

var stopLoader: Function;
var startLoader: Function = (text: string, finalText: string = 'done') => {
  const load = loading(text).start();
  stopLoader = () => {
    load.succeed(finalText);
  };
}

export default class React extends Command {
  static description = "Create react base project's boilerplate";

  static examples = [
    'npx sudofy-bp react "demo-project"',
    'sudofy-bp react "demo-project" -t',
  ];

  repo = {
    url: '"https://github.com/kashif-mughalll/multimedia.git"',
    ts: "",
  };

  static flags = {
    typeScript: Flags.boolean({
      char: "t",
      description: "add for typescript version of same boilerplate",
    }),
  };

  static args = [
    {
      name: "Project-Name",
      description: "name of projct you want to keep",
      required: true,
    },
  ];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(React);
    if (flags.typeScript) {
      if (this.repo.ts)
        exec(`git clone --depth 1 ${this.repo.ts} ${args["Project-Name"]}`);
      else this.error("TypeScript version isn't available yet.", { exit: 1 });
      process.exit(1);
    } else {
      startLoader("Downloading files ....", "All files downloaded successfully.");
      await execCommand(`git clone --depth 1 ${this.repo.url} ${args["Project-Name"]}`);
      stopLoader();
      startLoader("Installing dependencies, this will take a while ....", "fetched all dependencies successfully.");
      process.chdir(args["Project-Name"]);
      await execCommand(`npm i`)
      stopLoader();
      this.log("\n   Successfully done.\n");
    }
  }
}
