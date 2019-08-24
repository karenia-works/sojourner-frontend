<template>
  <div>
    <div class="container">
      <h1>Review Home Rules</h1>
      <div class = "staytime">
        <h2>{{ stayLength }} Night At {{ stayPlace }}</h2>
        <div class= "startAndEnd">
            <label class = "startTime info"> Tuesday Check-in</label>
            <label class = "startTime info"> 3PM - 5PM</label>
            <label class = "endTime info"> Tuesday Check-in</label>
            <label class = "endTime info"> 3PM - 5PM</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
h1 {
  font-size: font-sizes.large-title;
  font-weight: normal;
  text-transform: uppercase;
  text-align: left;
}

.staytime{
    h2{
        font-size: font-sizes.small-title;
        font-weight: normal;
        text-transform: uppercase;
        text-align: left;
    }

    .startAndEnd{
            
    }
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {
      
  }
})
export default class PayCheck extends Vue {
    data(){
        return{
            stayLength:3,
            stayPlace:'PuJi Island',
        }
    }
}
</script>