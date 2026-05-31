import kleur from "kleur";

export const log = {
  step: (msg: string) => console.log(kleur.gray(`→ ${msg}`)),
  added: (path: string) => console.log(`  ${kleur.green("+")} ${path}`),
  overwritten: (path: string) =>
    console.log(`  ${kleur.yellow("~")} ${path}`),
  skipped: (path: string) =>
    console.log(`  ${kleur.gray("·")} ${path} (skipped)`),
  bold: (msg: string) => console.log(kleur.bold(msg)),
  plain: (msg: string) => console.log(msg),
  blank: () => console.log(),
  error: (msg: string) => console.error(kleur.red(`✗ ${msg}`)),
};
