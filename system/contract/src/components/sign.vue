<template>
<v-app>
  <v-container fluid class="grey lighten-5">
    <v-row>
      <v-spacer></v-spacer>
    <v-col cols="12" sm="4" lg="4" xs="12">
            <v-text-field
            :items="[username]"
            :value="username"
            label="契约人甲ID"
            hint="本位置的契约人作为契约的主动方"
            persistent-hint
            filled
            outlined
            disabled
            >
            </v-text-field>
      </v-col>
      <v-col cols="12" sm="4" lg="4" xs="12">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
              <v-text-field
              placeholder="关于xx的xx契约(当然任何您喜欢的名字都可以"
              label="快来为契约命名吧!"
              hint="发布契约前请认真考虑，契约一旦发布即具有效力"
              persistent-hint
              filled
              outlined
              v-bind="attrs"
              v-on="on"
              >
              </v-text-field>
              </template>
              <span>契约的名字有时很重要，一个具有很大信息量的名字总能引起人们的注意</span>
            </v-tooltip>
        </v-col>
       <v-col cols="12" sm="2" lg="2" xs="12">
        <v-select
          :items="items"
          label="契约模式"
          hint="选择您的契约模式"
          v-model="modeselector"
          @change="dialog=true"
          persistent-hint
          outlined
          filled
        ></v-select>
        </v-col>
        <v-col cols="12" sm="2" lg="2" xs="12" class="d-flex justify-center">
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    elevation="2"
                    fab
                    large
                    icon
                    outlined
                    plain
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon>mdi-typewriter</v-icon>
                    </v-btn>
            </template>
            <span>发布契约！</span>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        lg="12"
        xl="12"
      >
            <v-autocomplete
              v-model="objectB"
              :disabled="isUpdating"
              :items="people"
              filled
              chips
              color="blue-grey lighten-2"
              label="输入契约方乙"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar tile>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        lg="12"
        xl="12"
      >
        <v-textarea
          filled
          name="input-7-4"
          label="契约概述"
          placeholder="本契约声明了甲与乙关于xx的(政治\法律\经济\战争)行为，主要进行(货币交易、物品交易、商业承诺……)"
          hint="契约概述是为了能够让甲乙以外的人更方便的了解契约的内容，同时也方便签署方后期寻找"
          persistent-hint
        ></v-textarea>
      </v-col>
    </v-row>
    <h1 v-if="modeselector==null">请选择契约模式</h1>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        lg="12"
        xl="12"
        v-if="modeselector=='政治契约'"
      >
      <Politics :username="username" :position="position" :dependency="dependency" :disable="(position!='Ops')&&(position!='Administration')"></Politics>
      <template v-if="(position!='Ops')&&(position!='Administration')">
          <v-dialog
          v-model="dialog"
          max-width="30%"
          >
          <v-card>
              <v-card-title>
              你不是领导人或观察团成员
              </v-card-title>

              <v-card-text>
                  您只是<b>{{dependency}}</b>的<b>{{position}}</b><br/>
                  不具有<b>Administration</b>或<b>Ops</b>权限<br/>
                  <b>{{username}}</b>，您目前无法发布政治契约<p style="display:inline-block">( ；´Д｀)</p>
              </v-card-text>

              <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  text
                  @click="dialog = false"
              >
                  知道了
              </v-btn>
              </v-card-actions>
          </v-card>
          </v-dialog>
      </template>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        lg="12"
        xl="12"
        v-if="modeselector=='经济契约'"
      >
      <Economics></Economics>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        lg="12"
        xl="12"
        v-if="modeselector=='法律契约'"
      >
      <Law></Law>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        lg="12"
        xl="12"
        v-if="modeselector=='战争契约'"
      >
      <War></War>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>
<script>
import Economics from './economics.vue'
import Law from './law.vue'
import Politics from './politics.vue'
import War from './war.vue'
  export default {
    props:{
      username:String,
      position:String,
      dependency:String
    },
    components:{Politics, Economics, Law, War},
    data: () => {
      return{
        autoUpdate: true,
        objectB: ['ScarleBcMetr05', 'Notch'],
        isUpdating: false,
        name: 'Midnight Crew',
        people: [
          { header: '玩家' },
          { name: 'ScarleBcMetr05', group: 'Ops', avatar: 'https://mineskin.de/avatar/ScarleBcMetr05' },
          { name: 'Notch', group: 'Ops', avatar: 'https://mineskin.de/avatar/Notch' },
          { name: 'Creeper', group: 'Administration', avatar: 'https://mineskin.de/avatar/Creeper' },
          { name: 'ABC', group: 'Citizen', avatar: 'https://mineskin.de/avatar/ABC' },
          { name: 'YX', group: 'Citizen', avatar: 'https://mineskin.de/avatar/YX' },
          { divider: true },
          { header: '群体'},
          { name: '所有玩家', group: '群体', avatar: 'https://mineskin.de/avatar/Steve' },
          { divider: true },
          { header: '政治实体' },
          { name: '大不列颠及北爱尔兰附属岛屿联合王国', group: '国家', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/2880px-Flag_of_the_United_Kingdom.svg.png' },
          { divider: true },
          { header: '经济实体' },
          { name: 'Microsoft', group: '企业', avatar: 'https://upload.wikimedia.org/wikipedia/commons/9/94/M_box.svg' },
          { divider: true },
          { header: '法律实体' },
          { name: '纳税人', group: '法律实体', avatar: 'https://mineskin.de/avatar/Steve' },
        ],
        title: 'The summer breeze',
      selectedB: [],
      dialog: true,
      items: ['政治契约', '经济契约', '法律契约', '战争契约'],
      itemsB: ['ScarleBcMetr05', 'Hotdog64', 'Optfinest', 'ZhuguangExchange'],
      searchA:null,
      searchB:null,
      modeselector:'政治契约',
    }},
  watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove (item) {
        const index = this.objectB.indexOf(item.name)
        if (index >= 0) this.objectB.splice(index, 1)
      },
    },
  }
</script>