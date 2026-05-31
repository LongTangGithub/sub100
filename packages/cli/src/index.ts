import { addCommand } from "./commands/add.js";
import { log } from "./lib/log.js";

const DEFAULT_REGISTRY = "https://sub100.dev";

const USAGE = `Usage:
  sub100 add <component>     Install a component from the sub100 registry

Examples:
  sub100 add button
  sub100 add command-menu

Options:
  --registry <url>           Override registry base URL (default: ${DEFAULT_REGISTRY})
  --yes                      Overwrite existing files without prompting
  --help                     Show this message
`;

type ParsedArgs = {
  command?: string;
  positional: string[];
  registry: string;
  yes: boolean;
  help: boolean;
};

function parseArgs(argv: string[]): ParsedArgs {
  const out: ParsedArgs = {
    positional: [],
    registry: process.env.SUB100_REGISTRY ?? DEFAULT_REGISTRY,
    yes: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === "--help" || arg === "-h") {
      out.help = true;
    } else if (arg === "--yes" || arg === "-y") {
      out.yes = true;
    } else if (arg === "--registry") {
      const next = argv[i + 1];
      if (!next) throw new Error("--registry requires a URL argument");
      out.registry = next;
      i++;
    } else if (arg.startsWith("--registry=")) {
      out.registry = arg.slice("--registry=".length);
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (!out.command) {
      out.command = arg;
    } else {
      out.positional.push(arg);
    }
  }

  return out;
}

async function main(): Promise<void> {
  let args: ParsedArgs;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err) {
    log.error(err instanceof Error ? err.message : String(err));
    process.stderr.write(`\n${USAGE}`);
    process.exit(1);
  }

  if (args.help || !args.command) {
    process.stdout.write(USAGE);
    process.exit(args.help ? 0 : 1);
  }

  if (args.command === "add") {
    const name = args.positional[0];
    if (!name) {
      log.error("`add` requires a component name");
      process.stderr.write(`\n${USAGE}`);
      process.exit(1);
    }
    await addCommand(name, { registry: args.registry, yes: args.yes });
    return;
  }

  log.error(`Unknown command: ${args.command}`);
  process.stderr.write(`\n${USAGE}`);
  process.exit(1);
}

main().catch((err) => {
  log.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
