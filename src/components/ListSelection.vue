<template>
  <div class="list-selection">
    <div
      class="selection-item"
      v-for="(item, index) in options"
      :key="index"
      :class="{selected: selectionSync.has(index)}"
      @click="select(index)"
    >{{item}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class ListSelection extends Vue {
  @Prop({ default: () => [], type: Array })
  options!: Array<String>;

  @PropSync("selection", { default: () => new Set(), type: Set })
  selectionSync!: Set<number>;

  @Prop({ default: false, type: Boolean })
  multiselect!: boolean;

  @Prop({ default: false, type: Boolean })
  showColumns!: boolean;

  @Prop({ default: false, type: Boolean })
  allowEmpty!: boolean;

  select(id: number) {
    if (this.multiselect) {
      this.flip(id);
    } else {
      this.reselect(id);
    }
    this.emitSelection();
    this.$forceUpdate();
  }

  flip(id: number) {
    let hasTgt = this.selectionSync.has(id);
    if (!hasTgt) {
      this.selectionSync.add(id);
    } else {
      this.selectionSync.delete(id);
    }
  }

  reselect(id: number) {
    if (this.allowEmpty && this.selectionSync.has(id)) {
      this.selectionSync.delete(id);
    } else {
      this.selectionSync.clear();
      this.selectionSync.add(id);
    }
  }

  @Emit("update:selection")
  emitSelection() {
    return this.selectionSync;
  }
}
</script>


<style lang="stylus" scoped>
.list-selection {
  display: flex
  flex-direction: row

  .selection-item {
    margin-h: spaces._2
    color: var(--color-text-medium)
    font-weight: 500
    transition: all 250ms

    &:hover {
      color: var(--color-text-dark)
    }

    &.selected {
      color: var(--color-text-dark)
      font-weight: 700
      background: linear-gradient(180deg, transparent 0% 50%, var(--color-accent-transparent) 50% 100%)

      &:hover {
      }
    }
  }
}
</style>
