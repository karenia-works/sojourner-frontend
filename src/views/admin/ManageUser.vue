<template>
  <div class="container">
    <searchbarAdmin class="SearchBar" :searchStatus.sync="searchStatus" @search="onSearch"></searchbarAdmin>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>UID</td>
        <td>Avatar</td>
        <td>User Name</td>
        <td>E-mail</td>
        <td>is Renting</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="user in users">
        <td>{{ user.uid }}</td>
        <td>
          <img :src="user.ava_url" class="ava_img" />
        </td>
        <td>{{ user.user_name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <label v-show="user.is_renting" class="yes_judge">Yes</label>
          <label v-show="!user.is_renting" class="no_judge">No</label>
        </td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <router-link to="">Change Info</router-link>
              <router-link to="">Delete</router-link>
              <router-link to="">Check Order</router-link>
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
      padding-top :50px;
      padding-bottom  :100px;
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
export default class ManageUser extends Vue {
  users = [
    {
      uid:10,
      user_name: "Clarissa Findlay",
      ava_url:
        "https://pic2.zhimg.com/v2-8df0e1ada7af09d3c62f2ba5ec4e4266_r.jpg",
      email: "KatarinaThatcher@example.com",
      is_renting: true
    },
    {
      uid:13,
      user_name: "Elissa Dejesus",
      ava_url:
        "https://pic1.zhimg.com/v2-b3972560b6f5b7ecfac44b3ceb78d134_r.jpg",
      email: "KatarinaThatcher@example.com",
      is_renting: true
    },
    {
      uid:84,
      user_name: "Cassidy Ayala",
      ava_url:
        "https://pic4.zhimg.com/v2-5b59a66778496948e13b429f17666be8_r.jpg",
      email: "KatarinaThatcher@example.com",
      is_renting: false
    },
    {
      uid:71,
      user_name: "Tanner Espinosa",
      ava_url:
        "https://pic2.zhimg.com/v2-f5a7d3fff4272ea3fc29122045f4b317_r.jpg",
      email: "KatarinaThatcher@example.com",
      is_renting: true
    }
  ];
}
</script>
