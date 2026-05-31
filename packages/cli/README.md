# sub100

Component installer for the sub100 library.

## Install

```sh
npx sub100 add button
```

## Usage

```sh
npx sub100 add button
npx sub100 add command-menu
npx sub100 add dialog
```

Components are copied into your project — no runtime dependency on sub100 after install.

## How it works

The CLI fetches each component from the sub100 registry and writes the files into your project's `components/`, `hooks/`, and `lib/` directories. Transitive dependencies (shared hooks, variants) are resolved automatically.

## Docs

Full docs and live component previews at [github.com/LongTangGithub/sub100](https://github.com/LongTangGithub/sub100).

## License

MIT
