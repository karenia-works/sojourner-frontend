<template>
  <div class="container">
    <div class="search-line">
      <input
        type="text"
        class="input"
        placeholder="Type in the room name you would like to find"
        v-model.trim="keyword"
      />
      <button class="btn srch_btn" @click="reRoute">Search</button>
      <router-link to="ManageRoom/NewRoom">
        <button class="btn">New Room</button>
      </router-link>
    </div>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>HID</td>
        <td>Room Name</td>
        <td>Preview</td>
        <td>Short Rent</td>
        <td>Avability</td>
        <td>Long Rent</td>
        <td>Avability</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="(room,index) in rooms" :key="index">
        <td>{{ room.id.substr(room.id.length-4) }}</td>
        <td>{{ room.name }}</td>
        <td>
          <img :src="room.img[0]" class="ava_img" />
        </td>
        <td>
          <label>${{ room.shortPrice }}/day</label>
        </td>
        <td>
          <label v-show="room.shortAvailable  " class="yes_judge">Yes</label>
          <label v-show="!room.shortAvailable" class="no_judge">No</label>
        </td>
        <td>
          <label>${{ room.longPrice }}/month</label>
        </td>
        <td>
          <label v-show="room.longAvailable" class="yes_judge">Yes</label>
          <label v-show="!room.longAvailable" class="no_judge">No</label>
        </td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <router-link :to="getRoomUrl(room.id)">Detail</router-link>
              <router-link :to="getChangeInfoUrl(room.id)">Change Info</router-link>
              <router-link to>Rent</router-link>
              <router-link v-on:click.native="deleteAPI(room.id)" to>Delete</router-link>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  .search-line {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 60px;

    .input {
      lost-column: 9 / 12;
    }

    .srch_btn{
      margin-right : 10px;
    }
  }

  .table {
    cellspacing = '0';
    cellpadding = '0';
    width: 100%;
    font-size: font-sizes.body-larger;

    .head {
      font-size: font-sizes.body-larger;
      font-weight: bold;
    }

    td {
      border-bottom: 1px solid var(--color-bg-medium);
      border-top: 1px solid var(--color-bg-medium);
      height: table-sizes.user;

      .ava_img {
        height: pic-sizes.avatar;
      }

      .yes_judge {
        font-weight: bold;
        color: var(--color-accent);
      }

      .no_judge {
        font-weight: bold;
        color: var(--color-error);
      }
    }
  }
}

.dropbtn {
  background-color: var(--color-bg-light);
  padding: 12px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--color-bg-light);
  min-width: 160px;
  border: 1px solid var(--color-bg-medium);
}

.dropdown-content a {
  padding: 13px 13px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: var(--color-bg-medium);
}

.dropdown:hover .dropdown-content {
  display: inline;
}

.dropdown:hover .dropbtn {
  background-color: var(--color-bg-medium);
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import searchbarAdmin from "@/components/SearchBarAdmin.vue";
import axios from "axios";
import { Room } from "@/models/Room";

@Component({
  components: { dotsIcon, searchbarAdmin }
})
export default class ManageRoom extends Vue {
  rooms: Room[] = [];
  origin_url = "https://sojourner.rynco.me/api/v1/room";
  api_url = "https://sojourner.rynco.me/api/v1/room";
  keyword = "";

  getRoomUrl(url: string) {
    return "/r/" + url+ "/detail";
  }
  getChangeInfoUrl(url: string) {
    return "ManageRoom/UpdateRoom?id=" + url;
  }

  getAPI() {
    axios
      .get(this.api_url)
      .then(response => (this.rooms = response.data))
      .catch(error => console.log(error));
  }

  async deleteAPI(delete_id: string) {
    console.log(this.$store.getters.authHeader);
    try {
      await axios.delete(this.DeleteItem(delete_id), {
        headers: this.$store.getters.authHeader
      });
    } catch (e) {
      console.log(e);
    }
    // this.rooms.filter(x => x.id == delete_id);
    this.getAPI();
  }

  mounted() {
    this.getAPI();
  }

  reRoute() {
    if (this.keyword == "") this.api_url = this.origin_url;
    else this.api_url = this.origin_url + "?kw=" + this.keyword;
    this.getAPI();
  }
  DeleteItem(delete_id: string) {
    return this.origin_url + "/" + delete_id;
  }

  log(id: string) {
    console.log(id);
  }
}
</script>
