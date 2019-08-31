<template>
  <div class="loading-bar">
    <div class="bar-content"></div>
  </div>
</template>

<style lang="stylus" scoped>
.loading-bar {
  height: 4px
  margin-bottom: -4px
  width: 100%
  overflow: hidden

  .bar-content {
    height: 4px
    background: var(--color-accent-z)
    animation: loading-bar-position 2s linear infinite, loading-bar-width 1s ease-out infinite alternate
  }
}

@keyframes loading-bar-position {
  0% {
    margin-left: -5%
  }

  50% {
    margin-left: 40%
  }

  100% {
    margin-left: 100%
  }
}

@keyframes loading-bar-width {
  0% {
    width: 5%
  }

  100% {
    width: 20%
  }
}
</style>
