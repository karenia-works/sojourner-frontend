<template>
  <div class="search">
    <div class="container">
      <SearchBar class="SearchBar" :searchStatus.sync="searchStatus" @search="onSearch"></SearchBar>
      <RoomsInGrid :roomlist="rooms" v-if="shouldSearch && !searching && !searchError"></RoomsInGrid>
      <div class="search-error" v-else-if="shouldSearch && searchError">{{searchErrorText}}</div>
      <div class="search-indicator" v-else-if="shouldSearch && searching">Searching</div>
      <div class="search-indicator" v-else>Enter your search items</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.SearchBar {
  margin: 20px 10px 30px
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import RoomsInGrid from "@/components/RoomsInGrid.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
import { Room } from "../models/Room";
import { SearchStatus } from "../store/search";
import { Dictionary } from "vue-router/types/router";
import axios from "axios";
import config from "../config";

@Component({
  components: {
    RoomsInGrid,
    SearchBar
  }
})
export default class Search extends Vue {
  rooms: Room[] = [];
  searchStatus: SearchStatus = new SearchStatus();

  shouldSearch: boolean = false;
  searching: boolean = true;
  searchError: boolean = false;
  searchErrorText?: string;

  mounted() {
    this.updateSearch();
  }

  @Watch("$route")
  updateSearch() {
    if (this.$route.query["kw"]) {
      this.shouldSearch = true;
      this.searchStatus = SearchStatus.fromDictionary(this.$route
        .query as Dictionary<string>);
      this.searchAccordingToCriteria();
    }
  }

  async searchAccordingToCriteria() {
    this.searching = true;
    let searchData = await axios.get<Room[]>(
      config.backend.address + config.backend.searchEndpoint,
      {
        params: this.searchStatus.toDictionary()
      }
    );

    this.searching = false;
    if (searchData.status >= 400) {
      this.searchError = true;
      this.searchErrorText = searchData.statusText;
    } else {
      this.searchError = false;
      this.searching = false;
      this.rooms = searchData.data;
    }
  }

  onSearch(value: SearchStatus) {
    this.$store.commit("replaceSearch", value);
    console.log("search!", SearchStatus);
    this.$router.push({ name: "search", query: value.toDictionary() });
  }
}
</script>
