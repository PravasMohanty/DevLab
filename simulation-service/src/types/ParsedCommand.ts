export default interface ParsedCommand {
    category: string;
    action: string;
    resource: string;
    args: string[];
    flags: string[];
}
