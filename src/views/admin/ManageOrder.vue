<template>
  <div class="container">
    <searchbarAdmin class="SearchBar" :searchStatus.sync="searchStatus" @search="onSearch"></searchbarAdmin>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>OID</td>
        <td>Room Name</td>
        <td>Preview</td>
        <td>Lessee</td>
        <td>Duration</td>
        <td>Rent Type</td>
        <td>Price</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="order in orders">
        <td>{{ order.oid }}</td>
        <td>{{ order.room_name }}</td>
        <td>
          <img :src="order.ava_url" class="ava_img" />
        </td>
        <td>{{ order.user_name }}</td>
        <td>{{ order.duration }}</td>
        <td>
          <label v-show="order.is_long_rent" class="yes_judge">Long Rent</label>
          <label v-show="!order.is_long_rent" class="no_judge">Short Rent</label>
        </td>
        <td>
          <label v-show="order.is_long_rent">${{ order.price }}/month</label>
          <label v-show="!order.is_long_rent">${{ order.price }}/day</label>
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
        color: var(--color-text-medium);
      }

      .no_judge {
        font-weight: bold;
        color: var(--color-accent);
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
export default class Manageorder extends Vue {
  orders = [
    {
      oid: 1,
      user_name: "Clarissa Findlay",
      ava_url:
        "https://z1.muscache.cn/im/pictures/6061582/a643208f_original.jpg?aki_policy=xx_large",
      room_name: "Coastal Maine Cottage",
      is_long_rent: true,
      duration: "Aug12 - Sep18",
      price: 309
    },
    {
      oid: 32,
      user_name: "Elissa Dejesus",
      ava_url:
        "https://z1.muscache.cn/im/pictures/14086670/8f77374b_original.jpg?aki_policy=xx_large",
      room_name: "A beautiful villa in North Iceland",
      is_long_rent: true,
      duration: "Jan13 - Feb12",
      price: 138
    },
    {
      oid: 21,
      user_name: "Cassidy Ayala",
      ava_url:
        "https://z1.muscache.cn/im/pictures/cd17b75f-9aee-4f68-b80d-dde84996fb4b.jpg?aki_policy=xx_large",
      room_name: "Kealakekua Bay Bali Cottage -steps from Bay",
      is_long_rent: false,
      duration: "May5 - Jun27",
      price: 225
    },
    {
      oid: 341,
      user_name: "Tanner Espinosa",
      ava_url:
        "https://z1.muscache.cn/im/pictures/6717551/528a76f1_original.jpg?aki_policy=large",
      room_name: "The house among olive trees",
      is_long_rent: true,
      duration: "Aug12 - Sep18",
      price: 798
    }
  ];
}
</script>
