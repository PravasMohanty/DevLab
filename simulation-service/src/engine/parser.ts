import ParsedCommand from "../types/ParsedCommand";

const commandMap: Record<string, string> = {
  pull: "resource",
  images: "view",
  run: "simulate",
  ps: "view",
  stop: "resource",
  start: "resource",
  rm: "resource",
  logs: "view",
  inspect: "resource",
};

export const parse = (command: string): ParsedCommand | null => {
  const parts = command.trim().split(/\s+/);

  const category = parts[0];
  const action = parts[1];

  if (!category || !action) return null;

  if (category !== "docker") return null;

  const resource = commandMap[action];

  if (!resource) return null;

  const args: string[] = [];
  const flags: string[] = [];

  for (let i = 2; i < parts.length; i++) {
    const part = parts[i];

    if (!part) continue;

    if (part.startsWith("-")) {
      flags.push(part);
    } else {
      args.push(part);
    }
  }

  return {
    category,
    action,
    resource,
    args,
    flags,
  };
};