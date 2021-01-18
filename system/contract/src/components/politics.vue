<template>
<div>
    <template v-if="disable">
        您无法使用Politcis
    </template>
    <template v-else>
            <v-row >
            <v-col
                cols="12"
                sm='4'
                lg='4'
                xs='12'
            >
                <v-subheader><small>您的个人信息</small></v-subheader>
                  <v-simple-table class="rounded-lg" style="border:1px solid #BDBDBD">
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-center">
                            您的ID(ID)
                        </th>
                        <th class="text-center">
                            您的属地(Dependency)
                        </th>
                        <th class="text-center">
                            您的地位(Position)
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td class="text-center">{{username}}</td>
                        <td class="text-center">{{dependency}}</td>
                        <td class="text-center">{{position}}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col
                    cols="12"
                    sm='4'
                    lg='4'
                    xs='12'
                >
                    <v-subheader><small>近期关于您的民意调查</small></v-subheader>
                    <v-simple-table class="rounded-lg" style="border:1px solid #BDBDBD">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <th 
                            class="text-center"
                            v-bind="attrs"
                            v-on="on"
                            >
                                本地支持率
                            </th>
                            </template>
                            <span>LocalNationApprovalRating,LNAR</span>
                            </v-tooltip>
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <th 
                            class="text-center"
                            v-bind="attrs"
                            v-on="on"
                            >
                                契约履行率
                            </th>
                            </template>
                            <span>ContractPerformanceIndex,CPI</span>
                            </v-tooltip>
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <th 
                            class="text-center"
                            v-bind="attrs"
                            v-on="on"
                            >
                                GM评级
                            </th>
                            </template>
                            <span>ObjectiveGrade,OG</span>
                            </v-tooltip>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td class="text-center">{{LNAR}}%<v-icon x-small>mdi-arrow-up-bold</v-icon></td>
                            <td class="text-center">{{CPI}}%<v-icon x-small>mdi-arrow-down-bold</v-icon></td>
                            <td class="text-center"><b>{{OG}}</b></td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            <v-col
                    cols="12"
                    sm='4'
                    lg='4'
                    xs='12'
                >
                    <v-subheader><small>您的私人财产(详情请前往“资产情况”)</small></v-subheader>
                    <v-simple-table class="rounded-lg" style="border:1px solid #BDBDBD">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <th 
                            class="text-center"
                            v-bind="attrs"
                            v-on="on"
                            >
                                货币资产
                            </th>
                            </template>
                            <span>MonetaryCapital</span>
                            </v-tooltip>
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <th 
                            class="text-center"
                            v-bind="attrs"
                            v-on="on"
                            >
                                土地资产
                            </th>
                            </template>
                            <span>LandCapital</span>
                            </v-tooltip>
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <th 
                            class="text-center"
                            v-bind="attrs"
                            v-on="on"
                            >
                                库存总价
                            </th>
                            </template>
                            <span>TotalInventoryPrice(按照市场均价*)</span>
                            </v-tooltip>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td class="text-center">{{MC}}</td>
                            <td class="text-center">{{LC}}</td>
                            <td class="text-center">{{TIP}}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <br/>
            <v-row class="d-flex justify-left align-center">
                <v-col
                    cols="12"
                    sm='3'
                    lg='3'
                    xs='3'
                >
                    <v-select
                    :items="['承诺/允诺','交换/提供','索取/要求','谴责/声讨']"
                    label='这是您的...'
                    hint="叙事腔调代表了您对该契约内容的态度"
                    persistent-hint
                    outlined
                    filled
                    ></v-select>
                </v-col>
                <v-col 
                    cols="12"
                    sm='3'
                    lg='3'
                    xs='3'
                >
                    <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dates"
                                label="契约截止日期"
                                prepend-icon="mdi-calendar"
                                hint="契约在每天0点检查时效"
                                persistent-hint
                                v-on='on'
                                v-bind="attrs"
                                readonly
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="dates"
                                locale="zh-cn"
                            ></v-date-picker>
                        </v-menu>
                </v-col>
                <v-col
                    cols="12"
                    sm='3'
                    lg='3'
                    xs='3'
                >
                <v-switch
                    v-model="publicorprivate"
                    inset
                    hint="如果你的契约不想被人所知，那就选择私有吧"
                    persistent-hint
                    :label="publicorprivate ?'公开(Public)':'私有(Private)'"
                ></v-switch>
                </v-col>
            </v-row>
    </template>
</div>
</template>
<script>
export default {
    props:{
        position:String,
        dependency:String,
        username:String,
        disable:null
    },
    data:()=>{
        return{
            dates: new Date().toISOString().substr(0, 10),
            menu: false,
            publicorprivate: true,
            dialog: true,
            LNAR:60.9,
            CPI:92,
            OG:'AAA',
            MC:81230893,
            LC:238923,
            TIP:4234821,
        }
    },
}
</script>