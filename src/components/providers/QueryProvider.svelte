<script lang="ts">
  import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
  import { QueryClient } from '@tanstack/svelte-query';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
  import { PersistQueryClientProvider } from '@tanstack/svelte-query-persist-client';

  import type { Snippet } from 'svelte';

  const { children, root }: { children: Snippet; root?: ShadowRoot } = $props();

  const client = new QueryClient();
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });
</script>

<PersistQueryClientProvider {client} persistOptions={{ persister }}>
  {@render children?.()}
  <SvelteQueryDevtools shadowDOMTarget={root} />
</PersistQueryClientProvider>
