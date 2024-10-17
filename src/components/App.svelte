<script lang="ts">
  import HomeComponent from '~/components/home/HomeComponent.svelte';
  import QueryProvider from '~/components/providers/QueryProvider.svelte';
  import Suspense from '~/components/utils/Suspense.svelte';
  import { initServices } from '~/web/init-services';

  const {
    options,
    root,
  }: {
    options: {
      baseUrl?: string;
      view?: { option?: boolean; popup?: boolean; web?: boolean };
    };
    root: ShadowRoot;
  } = $props();
</script>

<div class="app-container">
  <QueryProvider {root}>
    <Suspense promise={initServices(options)}>
      <HomeComponent />
    </Suspense>
  </QueryProvider>
</div>

<style lang="scss" global>
  @use 'src/styles/base.scss';

  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: var(--full-height);
  }
</style>
