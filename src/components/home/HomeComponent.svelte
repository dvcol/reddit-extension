<script lang="ts">
  import { RouterView } from '@dvcol/svelte-simple-router/components';

  import { useNavigate } from '@dvcol/svelte-simple-router/router';
  import { transition } from '@dvcol/svelte-simple-router/utils';

  import Logo from '~/assets/svg/reddit-alien.svg';
  import NeoButton from '~/components/common/buttons/neo-button.svelte';
  import { RouteName } from '~/router/routes';
  import { useI18n } from '~/utils/i18n.utils';

  const i18n = useI18n('home');

  const { push } = useNavigate();

  let loading = $state(true);
  setInterval(() => {
    loading = !loading;
  }, 30000);
</script>

<main class="home-container">
  <div>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={Logo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>{i18n('title')}</h1>
  <div class="links">
    <NeoButton onclick={() => push({ path: `/${RouteName.Hello}` })}>{RouteName.Hello}</NeoButton>
    <NeoButton onclick={() => push({ path: `/${RouteName.Goodbye}` })}>{RouteName.Goodbye}</NeoButton>
    <NeoButton disabled onclick={() => push({ path: `/${RouteName.Home}` })}>Disabled</NeoButton>
    <NeoButton {loading} onclick={() => push({ path: `/${RouteName.Home}` })}>Loading</NeoButton>
    <NeoButton text onclick={() => push({ path: `/${RouteName.Goodbye}` })}>Text</NeoButton>
    <NeoButton rounded onclick={() => push({ path: `/${RouteName.Goodbye}` })}>Rounded</NeoButton>
  </div>

  <div class="view">
    <RouterView {transition} />
  </div>

  <div class="links" style="gap: 5rem;">
    <NeoButton {loading} pulse onclick={() => push({ path: `/${RouteName.Hello}` })}>Pulse</NeoButton>
    <NeoButton coalesce onclick={() => push({ path: `/${RouteName.Hello}` })}>Coalesce</NeoButton>
  </div>
</main>

<style lang="scss">
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .links {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }

  .logo {
    height: 10rem;
    padding: 1.5em;
    transition: filter 300ms;
    will-change: filter;
  }

  .view {
    min-height: 10rem;
    padding: 2rem;
  }
</style>
