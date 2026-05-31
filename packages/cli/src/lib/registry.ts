export type RegistryFile = { path: string; content: string; type: string };

export type RegistryEntry = {
  name: string;
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
};

export async function resolveTree(
  name: string,
  baseUrl: string,
  visited: Set<string> = new Set(),
): Promise<{ files: RegistryFile[]; npmDeps: string[] }> {
  if (visited.has(name)) return { files: [], npmDeps: [] };
  visited.add(name);

  const url = `${baseUrl.replace(/\/$/, "")}/r/ui/${name}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch "${name}": HTTP ${res.status} from ${url}`,
    );
  }
  const entry = (await res.json()) as RegistryEntry;

  const collected: RegistryFile[] = [...entry.files];
  const npmDeps: string[] = [...entry.dependencies];

  // Sequential walk — prevents racing on the shared `visited` set.
  for (const dep of entry.registryDependencies ?? []) {
    const sub = await resolveTree(dep, baseUrl, visited);
    collected.push(...sub.files);
    npmDeps.push(...sub.npmDeps);
  }

  return { files: collected, npmDeps };
}
