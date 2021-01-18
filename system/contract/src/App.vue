<template>
  <v-app id="inspire">
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            契约系统
          </v-list-item-title>
          <v-list-item-subtitle>
            Contract System
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          depressed
          @click="step=item.id"
          link
        >
          <v-list-item-icon>
            <img v-bind:src="item.icon" height="100%"/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
            {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-main>
    <v-system-bar
        height="30"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
          >
            mdi-flag
          </v-icon>
        </template>
        <span>属地:{{dependency}}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
          >
            mdi-badge-account-horizontal
          </v-icon>
        </template>
        <span>地位:{{position}}</span>
      </v-tooltip>
      <span>12:40PM</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-account</v-icon>
      <span>{{username}}</span>
    </v-system-bar>
      <v-window v-model="step" ><!--vertical也可以-->
      <v-window-item :value="1">
        <Signwindow :username="username" :position="position" :dependency="dependency"></Signwindow>
      </v-window-item>

      <v-window-item :value="2">
        <h1>2</h1>
      </v-window-item>

      <v-window-item :value="3">
        <h1>3</h1>
      </v-window-item>
    </v-window>
    </v-main>
  </v-app>
</template>

<script>
  import Signwindow from './components/sign.vue'
  export default {
    components:{Signwindow},
    data:()=>({
        username:"ScarleBcMetr05",
        position:"Ops",
        dependency:"GameMaster",
        step:1,
        items:[
        {id:1,title:"签订契约",icon:"https://hemu.blog/anarchism/Anarchism_files/Book_and_Quill_JE2_BE2.png"},
        {id:2,title:"已签署契约",icon:"https://hemu.blog/anarchism/Anarchism_files/Portfolio.png"},
        {id:3,title:"资产情况",icon:"https://hemu.blog/anarchism/Anarchism_files/Emerald_JE3_BE3.png"},
      ]
    }),
  }
</script>