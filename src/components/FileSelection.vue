<template>
  <div class="file-selector">
    <div class="file-display">
      <div class="file-display-line" v-for="(file, index) in files" :key="file.name">
        <div @click="removeFile(index)">
          <delete-icon />
        </div>
        <div class="filename">{{file.name}}</div>
      </div>
    </div>
    <input type="file" class="file-selector-invis" ref="fileSelector" @input="onUpdate" multiple />
    <div class="btn-line">
      <div class="btn" @click="selectFile">Select File</div>
      <div class="btn" @click="upload" v-if="showUpload">Upload</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Emit } from "vue-property-decorator";
import DeleteIcon from "vue-material-design-icons/Close.vue";
import Axios from "axios";

@Component({
  components: {
    DeleteIcon
  }
})
export default class FileSelection extends Vue {
  // @Prop({ type: Boolean, default: false }) showUpload!: boolean;

  @PropSync("selectedFiles", { type: Array, default: () => [] })
  files!: File[];

  get showUpload(): boolean {
    return this.files.length > 0;
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  selectFile() {
    (this.$refs.fileSelector as HTMLFormElement).click();
  }

  upload() {
    this.emitUploadFiles();
  }

  async onUpdate() {
    let files = (this.$refs.fileSelector as HTMLFormElement).files as FileList;
    this.files.push(...files);
  }

  @Emit("upload")
  emitUploadFiles() {
    return this.files;
  }
}
</script>

<style lang="stylus" scoped>
.file-selector {
  .file-display-line {
    display: flex
    flex-direction: row

    .filename {
      width: auto
    }
  }

  .file-selector-invis {
    display: none
  }
}

.btn-line {
  display: flex
  flex-direction: row
}
</style>
