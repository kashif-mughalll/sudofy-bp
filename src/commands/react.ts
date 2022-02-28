import { Command, Flags } from "@oclif/core";
const { execSync } = require("child_process");

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
        execSync(`git clone --depth 1 ${this.repo.ts} ${args["Project-Name"]}`);
      else this.error("TypeScript version isn't available yet.", { exit: 1 });
      process.exit(1);
    } else {      
      this.log("Downloading files ....");
      execSync(`git clone --depth 1 ${this.repo.url} ${args["Project-Name"]}`);
      this.log("fetching dependencies ....");
      process.chdir(args["Project-Name"]);
      execSync("npm i");
      this.log("\n   Successfully done.\n");
    }
  }
}
