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

  if (!category || !action) {
    return null;
  }

  if (category !== "docker") {
    return null;
  }

  const resource = commandMap[action];

  if (!resource) {
    return null;
  }

  let name = parts[2] ?? "";

  const flag =
    parts[2]?.startsWith("-")
      ? parts[2]
      : parts[3]?.startsWith("-")
        ? parts[3]
        : "";

  if (flag) {
    name = parts[3] ?? "";
  }

  return {
    category,
    action,
    resource,
    name,
    flag,
  };
};

// Testing 
console.log(parse("docker pull nginx"));
console.log(parse("docker images"));
console.log(parse("docker run nginx"));
console.log(parse("docker stop web"));
console.log(parse("docker ps -a"));
console.log(parse("docker run -d nginx"));