<template>
  <footer>
    <div class="footer container">
      <div class="footer-column">
        <router-link to="/" class="root-link">Sojourner</router-link>
      </div>
    </div>
  </footer>
</template>

<style lang="stylus" >
footer {
  margin-top: spaces._6
  background: var(--color-bg-medium)
}

.footer-column {
  +break-screen(0, breakpoints.small) {
    lost-column: 1 / 1
  }

  +break-screen(breakpoints.small, breakpoints.medium) {
    lost-column: 1 / 2
  }

  +break-screen(breakpoints.medium, 0) {
    lost-column: 1 / 4
  }
}

.root-link {
  font-family: fonts-title
  font-weight: bold
  font-size: font-sizes.body-larger
  text-transform: uppercase
}
</style>
