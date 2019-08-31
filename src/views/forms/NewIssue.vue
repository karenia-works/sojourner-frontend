<template>
  <div class="newIssue">
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
  @Prop() order!: Order;

  uid: string = "";
  get repairText(): string {
    return this.issue.needRepair ?
      "need repair" : "not need repair";
  }

  issue: Issue = { 
    id: "",
    uid: this.order.userEmail,
    hid: this.order.houseId,
    wid: "",
    img: [],
    complaint: "",
    reply: "",
    needRepair: false,
    isReplied: false,
    isFinished: false,
    createTime: new Date()
  }

  files: Array<File> = [];
  async uploadImg(files: File[]) {
    let fileNames = await uploadImages(files);
    let fileLinks = fileNames.map(
      name => `https://sojourner.rynco.me/api/v1/image/${name}`
    );
    this.issue.img = fileLinks;
  }

  commitError: string | null = null;
  // data;

  // async mounted() {
  //   // await this.getUid();
  //   console.log("hi");
  //   console.log(this.data);
  //   console.log("hiii");
  // }

  // getUid() {
  // axios
  //   .get(config.backend.address+`user/me`, {
  //     headers: this.$store.getters.authHeader
  //   })
  //   // .then(response => (this.uid = response.data.userId))
  //   .then(response => (this.data = response.data))
  //   .catch(error => console.log(error));
  //   console.log("getuid end");

  // }

  async commit() {
    await this.uploadImg(this.files);
    try {
      let result = await axios.post(
        config.backend.address + config.backend.issueEndpoint,
        this.issue,
        { headers: this.$store.getters.authHeader }
      );

      let success = result.status == 201;
      // this.$router.push({ name: "home" });
    } catch (e) {
      this.commitError = e;
    }
  }
}
</script>

<style lang="stylus" scoped>
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