<template>
  <div class="container">
    <div class="issue_info">
      <div class="title1">
        <label>IID:</label>
        <label>Type:</label>
        <label>Content:</label>
        <label>Reply:</label>
      </div>
      <div class="title2">
        <label>{{ iid }}</label>
        <label v-show="Issues.needRepair">Repair Issue</label>
        <label v-show="!Issues.needRepair">compliant</label>
        <div class="compliant">{{Issues.complaint}}</div>
      </div>
    </div>
    <div class="put_img">
      <img v-for="(img, index) in imgs" :src="img" :key="index" />
    </div>

    <div class="input_reply">
      <textarea class="input_character" v-model="Issues.reply" />
    </div>
    <div class="reply_button">
      <router-link to="ManageIssue">
        <button class="reply btn" @click="ReplyIssue(Issues)">Reply</button>
      </router-link>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  display flex
  flex-direction column
  .issue_info {
    text-align: left;
    font-size: font-sizes.body-larger;
    font-weight: normal;
    line-height: 50px;
    display: flex;
    flex-direction: row;

    .title1 {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      margin-right: 20px;
    }

    .title2 {
      display: flex;
      flex-direction: column;

      .compliant {
        display: flex;
        text-align: justify;
      }
    }
  }

  .title1 {
    display: flex;
    font-weight: bold;
    margin-right: 20px;
    font-size: font-sizes.body-larger;
    line-height: 50px;
  }

  .put_img img {
    lost-column: 1 / 3;
  }

  .input_reply {
    .input_character {
      width: 100%;
      height: 10vw;
      font-size: font-sizes.body-larger;
      font-family: Barlow, 'Segoe UI', Helvetica, Arial, sans-serif;
      background: var(--color-bg-medium);
      border: none;
      resize: none;
    }
  }

  .reply_button {
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;

    .reply {
      font-size: font-sizes.medium-title;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {}
})
export default class ReplyIssue extends Vue {
  iid: string = this.GetQueryString("iid") as string;
  api_url = "https://sojourner.rynco.me/api/v1/issue/";

  Issues = [];

  async ReplyIssue(issue) {
    issue.isReplied=true;
    let request = await axios.put(this.api_url + this.iid, issue, {
      headers: this.$store.getters.authHeader
    });
    if (request.status < 200 && request.status >= 300)
      throw new Error(
        `Can not add order! state: ${request.status},id: ${issue.id}`
      );
  }

  getAPI() {
    axios
      .get(this.api_url + this.iid, {
        headers: this.$store.getters.authHeader
      })
      .then(response => (this.Issues = response.data))
      .catch(error => console.log(error));
  }

  mounted() {
    this.getAPI();
  }

  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}
</script>
