<script lang="ts">
  import { width } from '@dvcol/svelte-simple-router/utils';

  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import CircleLoading from '~/components/common/icons/CircleLoading.svelte';

  const {
    // Snippets
    children,
    icon,
    // States
    loading,
    // Styles
    text,
    glass, // todo
    rounded,
    coalesce,
    pulse,
    // Events
    onclick,
    onkeydown,
    onkeyup,
    // other button props
    ...rest
  }: {
    // Snippets
    children: Snippet;
    icon?: Snippet;
    // States
    loading?: boolean;
    // Styles
    text?: boolean;
    glass?: boolean;
    rounded?: boolean;
    coalesce?: boolean;
    pulse?: boolean;
    // Events
    onclick?: (e: MouseEvent | KeyboardEvent) => unknown;
    onkeydown?: (e: KeyboardEvent) => unknown;
    onkeyup?: (e: KeyboardEvent) => unknown;
  } & Partial<Omit<HTMLButtonAttributes, 'onclick' | 'onkeydown' | 'onkeyup'>> = $props();

  let pressed = $state(false);
  const onKeydownEnter = (e: KeyboardEvent) => {
    if (loading) return;
    onkeydown?.(e);
    if (e.key !== 'Enter') return;
    pressed = true;
  };
  const onKeyUpEnter = (e: KeyboardEvent) => {
    if (loading) return;
    onkeyup?.(e);
    if (e.key !== 'Enter') return;
    pressed = false;
    onclick?.(e);
  };
  const onClick = (e: MouseEvent) => {
    if (loading) return;
    onclick?.(e);
  };
</script>

<button
  class="neo-button"
  class:pulse
  class:coalesce
  class:pressed
  class:loading
  class:text
  class:rounded
  onkeydown={onKeydownEnter}
  onkeyup={onKeyUpEnter}
  onclick={onClick}
  {...rest}
>
  <span class="content">
    {#if loading || icon}
      <span class="icon" transition:width={{ duration: 200 }}>
        {#if loading}
          <CircleLoading />
        {:else}
          {@render icon?.()}
        {/if}
      </span>
    {/if}
    {@render children?.()}
  </span>
</button>

<style lang="scss">
  @use 'src/styles/mixin' as mixin;

  .neo-button {
    position: relative;
    display: flex;
    margin: 0.25rem;
    padding: 0.25rem 0.5rem;
    color: var(--btn-text-color, inherit);
    background-color: var(--btn-bg-color, inherit);
    border: 1px var(--btn-border-color, transparent) solid;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-raised-2);
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:focus-visible {
      color: var(--btn-text-color-focused, var(--text-color-focused));
      outline: none;
      box-shadow: var(--box-shadow-raised-1);
    }

    &.pressed,
    &:active:not(.loading) {
      box-shadow: var(--box-shadow-inset-2);
      transition: all 0.1s ease-out;
    }

    &.loading {
      cursor: wait;
    }

    &.loading:active,
    &:hover:not(:active) {
      border-color: var(--btn-border-color-hover, var(--border-color));
      box-shadow: var(--box-shadow-flat);
    }

    &[disabled]:not([disabled='false']) {
      color: var(--btn-text-color-disabled, var(--text-color));
      border-color: var(--btn-text-color-disabled, var(--border-color));
      box-shadow: none;
      cursor: not-allowed;
      opacity: 0.5;
    }

    @include mixin.pulse;
    @include mixin.coalesce;

    .content {
      display: inline-flex;
      gap: 0.25rem;
      align-items: center;
    }

    &.text {
      border-color: transparent !important;
      box-shadow: var(--box-shadow-flat);
    }

    &.rounded {
      border-radius: 2rem;
    }
  }
</style>
