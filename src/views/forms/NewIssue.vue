<template>
<div class="newIssue" v-if="showWindow">
  <div class="cover" @click="closeWindow"></div>
  <div class="issueWindow">
    <h2>new issue</h2>
    <div class="form">
      <div class="item">
        <label for="description">What's your problem?</label>
        <textarea 
        type="text" class="input" rows="3"
        id="description" 
        v-model.trim="issue.complaint" />
      </div>

      <div class="file-selection">
        <label for="description">Optional photos for further description
        </label>
        <file-selection @upload="uploadImg" :selectedFiles.sync="files" :showUpload="false"></file-selection>
      </div>

      <div class="item">
        <input type="checkbox" id="needRepair" v-model="issue.needRepair" />
        <label for="needRepair" class="checkLabel">{{repairText}}</label>
      </div>
    </div>
    <button class="btn" @click="commit">submit</button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import {Issue} from "@/models/Room.ts";
import {Order} from "@/models/Room.ts";
import Checkbox from "@/components/Checkbox.vue";
import FileSelection from "@/components/FileSelection.vue";
import config from "@/config.ts";
import axios from "axios";
import { uploadImages } from "@/helpers/uploadHelper";

@Component({
  components: {
    Checkbox,
    FileSelection
  }
})
export default class NewIssue extends Vue{
  @PropSync("show", { default: false, type: Boolean })
  showWindow!: boolean;
  @Prop() order!: Order;

  issue: Issue = { 
    id: "",
    uemail: this.order.userEmail,
    hid: this.order.houseId,
    wemail: "",
    img: [],
    complaint: "",
    reply: "",
    needRepair: false,
    isReplied: false,
    isFinished: false,
    createTime: new Date()
  }
  files: Array<File> = [];

  get repairText(): string {
    return this.issue.needRepair ?
      "need repair" : "not need repair";
  }

  closeWindow(): void {
    this.showWindow = false;
  }

  async uploadImg(files: File[]) {
    let fileNames = await uploadImages(files);
    let fileLinks = fileNames.map(
      name => `https://sojourner.rynco.me/api/v1/image/${name}`
    );
    this.issue.img = fileLinks;
  }

  commitError: string | null = null;

  async commit() {
    await this.uploadImg(this.files);
    try {
      let result = await axios.post(
        config.backend.address + config.backend.issueEndpoint,
        this.issue,
        { headers: this.$store.getters.authHeader }
      );

      let success = result.status == 201;
      // if (success) {
        alert("issue committed")
        this.closeWindow();
      // }
    } catch (e) {
      this.commitError = e;
    }
  }
}
</script>

<style lang="stylus" scoped>
.cover {
  height: 100%
  width: 100%
  position: fixed
  top: 0
  left: 0
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 8
}

.issueWindow {
  width: 400px
  background-color: var(--color-bg-light)
  border-radius: 5px
  position: fixed
  left: 50%
  top: 20%
  margin-left: -200px
  z-index: 9
  display: flex
  flex-direction: column
  align-items: center
  padding: spaces._6
}

.item {
  margin-v spaces._6
}

label:first-child {
  display block
  font-size font-sizes.small-title
  font-family fonts-title
}

textarea {
  width 400px
}

.input {
  margin-left 0
}

input[type=checkbox]{
  display none
}

.checkLabel {
  color: var(--color-text-medium)
  font-weight: 400
  transition: all 250ms
  font-size: font-sizes.body-larger
  font-family: fonts-title

  &:hover {
    color: var(--color-text-dark)
  }
}

input:checked+.checkLabel {
  color: var(--color-text-dark)
  font-weight: 500
  background: linear-gradient(180deg, transparent 0% 50%, var(--color-accent-transparent) 50% 100%)

  &:hover {
  }
}

</style>