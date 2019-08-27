<template>
  <div class="container">
    <searchbarAdmin class="SearchBar" :searchStatus.sync="searchStatus" @search="onSearch"></searchbarAdmin>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>HID</td>
        <td>Room Name</td>
        <td>Preview</td>
        <td>is Renting</td>
        <td>Short Rent</td>
        <td>Long Rent</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="room in rooms">
        <td>{{ room.hid }}</td>
        <td>{{ room.room_name }}</td>
        <td>
          <img :src="room.ava_url" class="ava_img" />
        </td>
        <td>
          <label v-show="room.is_renting" class="yes_judge">Yes</label>
          <label v-show="!room.is_renting" class="no_judge">No</label>
        </td>
        <td>
          <label>${{ room.short_rent_price }}/day</label>
        </td>
        <td>
          <label>${{ room.long_rent_price }}/month</label>
        </td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <a href>Option 1</a>
              <a href>Option 2</a>
              <a href>Option 3</a>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="progress">
      <div
        class="progress-bar progress-bar-success"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 90%;"
      >
        <span class="sr-only">90% 完成（成功）</span>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  .SearchBar {
    padding-top: 50px;
    padding-bottom: 100px;
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

@Component({
  components: { dotsIcon, searchbarAdmin }
})
export default class ManageRoom extends Vue {
  rooms = [
    {
      hid: 1,
      ava_url:
        "https://z1.muscache.cn/im/pictures/6061582/a643208f_original.jpg?aki_policy=xx_large",
      room_name: "Coastal Maine Cottage",
      is_renting: true,
      long_rent_price: 309,
      short_rent_price: 17
    },
    {
      hid: 2,
      ava_url:
        "https://z1.muscache.cn/im/pictures/14086670/8f77374b_original.jpg?aki_policy=xx_large",
      room_name: "A beautiful villa in North Iceland",
      is_renting: true,
      long_rent_price: 138,
      short_rent_price: 53
    },
    {
      hid: 3,
      ava_url:
        "https://z1.muscache.cn/im/pictures/cd17b75f-9aee-4f68-b80d-dde84996fb4b.jpg?aki_policy=xx_large",
      room_name: "Kealakekua Bay Bali Cottage -steps from Bay",
      is_renting: false,
      long_rent_price: 225,
      short_rent_price: 92
    },
    {
      hid: 4,
      ava_url:
        "https://z1.muscache.cn/im/pictures/6717551/528a76f1_original.jpg?aki_policy=large",
      room_name: "The house among olive trees",
      is_renting: true,
      long_rent_price: 798,
      short_rent_price: 12
    }
  ];
}
</script>
