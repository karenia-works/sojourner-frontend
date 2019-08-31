<template>
  <div class="search">
    <loading-bar v-if="searching" />
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
        <errors :error-code="204" />
      </div>
      <div class="search-error" v-else-if="shouldSearch && searchError">
        <errors :error-code="searchErrorCode" />
      </div>
      <!-- <div class="search-indicator" v-else-if="shouldSearch && searching">Searching</div> -->
      <div class="search-indicator" v-else>
        <explore-section></explore-section>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.SearchBar {
  margin: 20px 10px 30px
}

.search-error {
  lost-column: 1 / 1
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import RoomsInGrid from "@/views/room/RoomsInGrid.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
import { Room } from "../models/Room";
import { SearchStatus } from "../store/search";
import { Dictionary } from "vue-router/types/router";
import axios from "axios";
import config from "../config";
import ExploreSection from "@/components/search/Explore.vue";
import Errors from "@/components/art/Errors.vue";
import LoadingBar from "@/components/LoadingBar.vue";

@Component({
  components: {
    RoomsInGrid,
    SearchBar,
    ExploreSection,
    Errors,
    LoadingBar
  }
})
export default class Search extends Vue {
  rooms: Room[] = [];
  searchStatus: SearchStatus = new SearchStatus();

  shouldSearch: boolean = false;
  searching: boolean = false;
  searchErrorCode: number = 200;

  get searchError(): boolean {
    return this.searchErrorCode >= 300;
  }
  set searchError(_) {
    throw new Error();
  }
  searchErrorText?: string;

  mounted() {
    this.updateSearch();
  }

  @Watch("$route")
  updateSearch() {
    if (this.$route.query["kw"]) {
      this.shouldSearch = true;
      this.searchAccordingToCriteria();
    } else {
      this.shouldSearch = false;
    }
    this.searchStatus = SearchStatus.fromDictionary(this.$route
      .query as Dictionary<string>);
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
      this.searchErrorCode = searchData.status;
      if (searchData.status >= 400) {
        this.searchErrorText = searchData.statusText;
      } else {
        this.searching = false;
        this.rooms = searchData.data;
      }
    } catch (e) {
      this.searching = false;
      this.searchErrorCode = 999;
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
