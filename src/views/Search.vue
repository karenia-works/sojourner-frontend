<template>
  <div class="search">
    <div class="container">
      <SearchBar
        class="SearchBar"
        :searchStatus.sync="searchStatus"
        @search="onSearch"
        :showFilters="true"
      ></SearchBar>
      <RoomsInGrid
        :roomlist="rooms"
        v-if="shouldSearch && !searching && !searchError && rooms.length>0"
      ></RoomsInGrid>
      <div class="search-error" v-else-if="shouldSearch && !searching && !searchError">
        <div class="jumbotron">
          <h2>No room was found matching your target.</h2>
          <h3>Use different keywords and try again!</h3>
        </div>
      </div>
      <div class="search-error" v-else-if="shouldSearch && searchError">{{searchErrorText}}</div>
      <div class="search-indicator" v-else-if="shouldSearch && searching">Searching</div>
      <div class="search-indicator" v-else>
        <div class="jumbotron">
          <h2>Hmm... Seems you haven't entered anything yet.</h2>
          <h3>Try fill the search bar!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.SearchBar {
  margin: 20px 10px 30px
}

.jumbotron {
  padding-v: spaces._6
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
    } else {
      this.shouldSearch = false;
    }
  }

  async searchAccordingToCriteria() {
    this.searching = true;
    try {
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
    } catch (e) {
      this.searching = false;
      this.searchError = true;
      this.searchErrorText = "Network error. Try again!";
    }
  }

  onSearch(value: SearchStatus) {
    this.$store.commit("replaceSearch", value);
    console.log("search!", SearchStatus);
    this.$router.push({ name: "search", query: value.toDictionary() });
  }
}
</script>
