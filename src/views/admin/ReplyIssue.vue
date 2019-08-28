<template>
  <div class="container">
    <div class="issue_info">
      <div class="title1">
        <label>IID:</label>
        <label>Type:</label>
        <label>Content:</label>
      </div>
      <div class="title2">
        <label>{{ iid }}</label>
        <label v-show="needRepair">Repair Issue</label>
        <label v-show="!needRepair">compliant</label>
        <div class="compliant">{{compliant}}</div>
      </div>
    </div>
    <div class="put_img">
      <img v-for="img in imgs" :src="img" />
    </div>

    <div class="title1">Reply:</div>
    <div class="input_reply">
      <textarea class="input_character" />
    </div>
    <div class="reply_button">
      <router-link to="ManageIssue">
      <button class="reply btn">Reply</button>
      </router-link>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
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

@Component({
  components: {}
})
export default class ReplyIssue extends Vue {
  iid: number = 20;
  needRepair: boolean = true;
  imgs: string[] = [
    "https://z1.muscache.cn/im/pictures/20506730/77fd62c6_original.jpg?aki_policy=xx_large",
    "https://z1.muscache.cn/im/pictures/20506730/77fd62c6_original.jpg?aki_policy=xx_large",
    "https://z1.muscache.cn/im/pictures/20506730/77fd62c6_original.jpg?aki_policy=xx_large"
  ];
  compliant: string =
    "m of mr friendly by strongly peculiar juvenile. Unpleasant it sufficient simplicity am by friendship no inhabiting. Goodness doubtful material has denoting suitable she two. Dear mean she way and poor bred they come. He otherwise me incommode explained so in remaining. Polite barton in it warmly do county length an. Man request adapted spirits set pressed. Up to denoting subjects sensible feelings it indulged directly. We dwelling elegance do shutters appetite yourself diverted. Our next drew much you with rank. Tore many held age hold rose than our. She literature sentiments any contrasted. Set aware joy sense young now tears china shy. ";
  reply: string = "";
  isReplied: boolean = true;
}
</script>
