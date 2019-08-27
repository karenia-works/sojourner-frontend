<template>
  <div class="container">
    <searchbarAdmin class="SearchBar" :searchStatus.sync="searchStatus" @search="onSearch"></searchbarAdmin>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>RID</td>
        <td>Room Name</td>
        <td>Lessee</td>
        <td>Worker</td>
        <td>Reported</td>
        <td>&ensp;Replied&ensp;</td>    <!--half space-->
        <td>Repaired</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="repair in repairs">
        <td>{{ repair.rid }}</td>
        <td>{{ repair.room_name }}</td>
        <td>{{ repair.user_name }}</td>
        <td>{{ repair.worker_name }}</td>
        <td>
          <div :class="{'line':true , 'line1':!repair.is_reply, 'line2':repair.is_reply&&!repair.is_repair, 'line3': repair.is_reply&&repair.is_repair}"></div>
        </td>
        <td>
          <div :class="{'line':true , 'lineE':!repair.is_reply, 'line2':repair.is_reply&&!repair.is_repair, 'line3': repair.is_reply&&repair.is_repair}"></div>
        </td>
        <td>
          <div :class="{'line':true , 'lineE':!repair.is_reply, 'lineE':repair.is_reply&&!repair.is_repair, 'line3': repair.is_reply&&repair.is_repair}"></div>
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

.line{
  width: 100%;
  height: 20%;
    }

.line1 {
  background: var(--color-error);
}

.line2 {
  background: var(--color-text-medium);
}

.line3 {
  background: var(--color-accent);
}

.lineE{
  background: transparent;
    }
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import searchbarAdmin from "@/components/SearchBarAdmin.vue";

@Component({
  components: { dotsIcon, searchbarAdmin }
})
export default class ManageRepair extends Vue {
  repairs = [
    {
      rid: 1,
      room_name: "Coastal Maine Cottage",
      is_reply: false,
      is_repair: false,
      user_name: "Clarissa Findlay",
      worker_name:"Hafsah Lane"
    },
    {
      rid: 2,
      room_name: "A beautiful villa in North Iceland",
      is_reply: true,
      is_repair: false,
      user_name: "Elissa Dejesus",
      worker_name:"Bradley Hanna"
    },
    {
      rid: 3,
      room_name: "Kealakekua Bay Bali Cottage -steps from Bay",
      is_reply: false,
      is_repair: false,
      user_name: "Cassidy Ayala",
      worker_name:"Jenny Oneal"
    },
    {
      rid: 4,
      room_name: "The house among olive trees",
      is_reply: true,
      is_repair: true,
      user_name: "Tanner Espinosa",
      worker_name:"Trixie Ventura"
    }
  ];
}
</script>
