<template>
  <header class="header ff-heading">
    <img src="/images/logo/logo_white_transparent.png" class="header__logo" />
    <NuxtLink href="/" class="header__link">Start</NuxtLink>
    <NuxtLink href="/projects" class="header__link" disabled>Projekt</NuxtLink>
    <NuxtLink href="/blog" class="header__link" disabled>Blog</NuxtLink>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: $space-xl;

  &__logo {
    max-height: 64px;
  }

  &__link {
    color: var(--clr-white);
    text-decoration: none;
    position: relative;
    width: fit-content;

    &[disabled] {
      pointer-events: none;
      color: var(--clr-primary-light);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: -5%;
      width: 110%;
      height: 4px;
      background-color: var(--clr-secondary);
      border-radius: 8px;
      transform: scaleY(0%);
      transition: transform 200ms ease;
    }

    &:hover,
    &:active,
    &:focus {
      outline: none;
      color: var(--clr-secondary);

      &::after {
        transform: scaleY(100%);
      }
    }
  }
}
</style>
