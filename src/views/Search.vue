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
          <img src="../assets/sojourner-no-result.svg" alt class="search-tip-pic" />
          <h2>No room was found matching your target.</h2>
          <h3>Maybe try something different?</h3>
        </div>
      </div>
      <div class="search-error" v-else-if="shouldSearch && searchError">
        <div class="jumbotron">
          <img src="../assets/sojourner-no-data.svg" alt class="search-tip-pic" />
          <h2>Something's wrong with data connection</h2>
          {{searchErrorText}}
        </div>
      </div>
      <div class="search-indicator" v-else-if="shouldSearch && searching">Searching</div>
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

.jumbotron {
  padding-v: spaces._6
  lost-column: 1 / 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
}

.search-tip-pic {
  max-height: 40vh
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

@Component({
  components: {
    RoomsInGrid,
    SearchBar,
    ExploreSection
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
