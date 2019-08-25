<template>
  <div class="container">
    <h1>Rental contract</h1>
    <div class="lessorAndLessee">
      <div class="lessorlessee">
        <label class="lessText">Lessor:</label>
      </div>
      <div class="lessorlessee">
        <label class="lessText">Lessee:</label>
      </div>
    </div>
    <div class="lessorAndLessee">
      <div class="lessorlessee">
        <label class="lessText">ID card:</label>
      </div>
      <div class="lessorlessee">
        <label class="lessText">ID card:</label>
      </div>
    </div>
    <div class="text">
      <br />
      <hr class="hr_line" align="center" width="90%" size="1" />
      <br />In accordance with the Contract Law and other relevant laws and regulations,
      in order to clarify the rights and obligations of the lessor and the lessee,
      this contract is signed on the basis of equality and voluntariness.
      <div class="Article">Article 1</div>The basic situation of the rental housing: Rental housing location <label class="variable">{{stayPlace}}</label>,
      The type of the house is <label class="variable">{{RoomType}}</label>, and the quality of the house decoration is
      of good quality.
      <div class="Article">Article 2</div>Use of leased houses: [ ], the use of the house shall not be arbitrarily changed.
      Otherwise, the lessor has the right to take back the house.
      <div class="Article">Article 3</div>Time Limit for Renting a House: Since Zero <label class="variable">{{startMonth}}{{startDay}}</label>
      to zero <label class="variable">{{endMonth}}{{endDay}}</label>
      <div class="Article">Article 4</div>The rent agreed by both parties is [] yuan.
      <div class="Article">Article 5</div>Payment method of rent:
      1. The first payment is made before the day of the year, and the rent amount is RMB (ie, the rent on the day of the year - the date of the month of the year).
      2. The second payment is made before the day of the year, and the rent amount is RMB (ie, the rent on the day of the year - the date of the month of the year).
      3. The third payment is made before the day of the year, and the rent amount is RMB (ie, the rent on the day of the year - the date of the month of the year).
      If the lessee cannot pay the rent on time, the deferred increase of the late payment fee $<label class="variable">{{totalCost}}</label> per day, calculated in order of days.
      <div class="Article">Article 6</div>Other expenses that the lessee is responsible for paying: water, electricity, telephone, gas, television, property management, house rental tax and other expenses that should be borne by the lessee during the rental period.
      <div class="Article">Article 7</div>The lessee may not sublease the rented house and any renovated house without consent. Otherwise, all losses and consequences arising therefrom shall be borne by the lessee.
      <div class="Article">Article 8</div>The lessee shall pay attention to the repair of vulnerable parts such as water, electricity, doors and windows during the rental of the house to ensure the quality of the house. In particular, it is necessary to close the window at any time to prevent the water from being damaged and the decoration; the damage of the wearing parts in the house during the renting period is repaired by the lessee and bears the expenses.
      <div class="Article">Article 9</div>The lessee shall do a good job in security and theft prevention. All losses caused by theft during the lease period shall be borne by the lessee.
      <div class="Article">Article 10</div>If Party B needs to continue to rent a house or check out due, it shall notify the lessor 30 days before the expiration of the contract.
      Remarks:
      This contract is made in two copies, each party is responsible for each other.
    </div>

    <br />
    <br />
    <hr class="hr_line" align="center" width="90%" size="1" />
    <br />
    <div class="lessorAndLessee">
      <div class="lessorlessee">
        <label class="lessText">Lessor:</label>
      </div>
      <div class="lessorlessee">
        <label class="lessText">Lessee:</label>
      </div>
    </div>
    <div class="lessorAndLessee">
      <div class="lessorlessee">
        <label class="lessText">Contact number:</label>
      </div>
      <div class="lessorlessee">
        <label class="lessText">Contact number:</label>
      </div>
    </div>
    <br />
    <div class="text">Signing time(yyyy-mm-dd):</div>
  <br />
  <br />
  <br />
  </div>
</template>

<style lang="stylus" scoped>
h1 {
  font-size: font-sizes.large-title;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
}

.variable{
  font-weight: bold;
  text-decoration:underline;
  }

.Article {
  font-size: font-sizes.small-title;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
  margin: 10px;
}

.lessorAndLessee {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .lessorlessee {
    display: flex;
    flex-direction: row;
    width: 50%;

    .lessText {
      text-align: left;
      font-size: font-sizes.body-larger;
      font-weight: normal;
      line-height: 50px;
    }
  }
}

.text {
  text-align: left;
  font-size: font-sizes.body-larger;
  font-weight: normal;
  line-height: 30px;
}

.hr_line {
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Payment extends Vue {
  data() {
    return {
      stayPlace: "PuJi Island",
      startMonth: "Aug",
      startDay: "27",
      endMonth: "Sep",
      endDay: "12",
      totalCost: "9102",
      RoomType:'Single'
    };
  }
}
</script>