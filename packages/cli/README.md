# sub100

CLI for installing [sub100](https://sub100.dev) components into your project.

## Usage

```bash
npx sub100 add <component>
```

### Examples

```bash
npx sub100 add button
npx sub100 add command-menu
npx sub100 add confirm-dialog
```

### Options

| Flag | Description |
|---|---|
| `--registry <url>` | Override registry base URL (default `https://sub100.dev`) |
| `--yes`, `-y` | Overwrite existing files without prompting |
| `--help`, `-h` | Show usage |

Environment: `SUB100_REGISTRY` is read as a fallback for `--registry`.

## How it works

`add` fetches `<registry>/r/ui/<name>`, recursively resolves
`registryDependencies`, dedupes by name, then writes the component plus
all its hooks and lib files into the conventional shadcn-style layout:

```
components/ui/<name>.tsx
hooks/<hook>.ts
lib/<helper>.ts
```

npm packages the component imports (e.g. `tailwind-variants`,
`@radix-ui/react-dialog`) are listed at the end of the install run for
you to add manually.

## License

MIT
