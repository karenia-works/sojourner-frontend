<template>
  <div class="loading">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>


<style lang="stylus" scoped>
#loading {
  width: 32px;
  height: 32px;
  margin: 0 auto;
}
#loading .bar {
  background: #99aaca;
  border: 1px solid #96a6c9;
  float: left;
  margin: 6px 4px 0 0;
  width: 6px;
  height: 18px;
  -webkit-animation: loading-pulse 1s linear infinite normal;
  -moz-animation: loading-pulse 1s linear infinite normal;
  -ms-animation: loading-pulse 1s linear infinite normal;
  animation: loading-pulse 1s linear infinite normal;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
}
#loading .bar:nth-child(2) {
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  -o-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
#loading .bar:last-child {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
  margin-right: 0;
}

@keyframes loading-pulse {
  10% {
    margin-top: 5px;
    height: 22px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  20% {
    margin-top: 0px;
    height: 32px;
    border-color: #d1d7e2;
    background-color: #bac5db;
  }
  30% {
    margin-top: 1px;
    height: 30px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  40% {
    margin-top: 3px;
    height: 26px;
  }
  50% {
    margin-top: 5px;
    height: 22px;
  }
  60% {
    margin-top: 6px;
    height: 18px;
  }
}

@-moz-keyframes loading-pulse {
  10% {
    margin-top: 5px;
    height: 22px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  20% {
    margin-top: 0px;
    height: 32px;
    border-color: #d1d7e2;
    background-color: #bac5db;
  }
  30% {
    margin-top: 1px;
    height: 30px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  40% {
    margin-top: 3px;
    height: 26px;
  }
  50% {
    margin-top: 5px;
    height: 22px;
  }
  60% {
    margin-top: 6px;
    height: 18px;
  }
}

@-webkit-keyframes loading-pulse {
  10% {
    margin-top: 5px;
    height: 22px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  20% {
    margin-top: 0px;
    height: 32px;
    border-color: #d1d7e2;
    background-color: #bac5db;
  }
  30% {
    margin-top: 1px;
    height: 30px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  40% {
    margin-top: 3px;
    height: 26px;
  }
  50% {
    margin-top: 5px;
    height: 22px;
  }
  60% {
    margin-top: 6px;
    height: 18px;
  }
}
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LoadIcon extends Vue {

}
</script>