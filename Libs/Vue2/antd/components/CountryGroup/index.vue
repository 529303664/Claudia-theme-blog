<template>
  <div class="country--group">
    <p v-show="isShowLable">*country</p>
    <div class="country--group_list" :class="{'no-left': !isShowLable}">
      <a-tabs size="small" @change="handleChange">
        <a-tab-pane :tab="item" :key="index+1" v-for="(item, index) in tabs">
          <a-checkbox @change="onCheckAllChange($event, index)" :checked="checkAll[index]"> 全选 </a-checkbox>
          <div class="country--code">
            <a-checkbox-group :options="tabsList[index]" v-model="checkedList[index]" @change="onChange(index)">
            </a-checkbox-group>
            <!-- <div v-else>
              <div v-for="(sitem, sindex) in tabsList[index]" :key="sindex">
                <a-checkbox @change="onCheckAllChange($event, index, sindex)" :checked="checkAll[String(index) + String(sindex)]"> {{sitem.name}} </a-checkbox>
                <div class="country--code">
                  <a-checkbox-group :options="tabsList[index][sindex].v" v-model="checkedList[String(index) + String(sindex)]" @change="onChange(index, sindex)" />
                </div>
              </div>
            </div> -->
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
const plainOptions = ['Apple', 'Pear', 'Orange'];
// 中文映射
const CodesMap = {
	0: [],
	1: ['印度', 'AF', '孟加拉', '斯里兰卡', '马尔代夫', '尼泊尔','巴基斯坦'],
	2: ['印度尼西亚', '马来西亚', '菲律宾', '新加坡', '泰国', '越南'],
	3: ['亚美尼亚', '阿塞拜疆', '保加利亚', '白俄罗斯', '爱沙尼亚', '格鲁吉亚', '吉尔吉斯斯坦', '哈萨克斯坦', '立陶宛', '拉脱维亚', '摩尔多瓦', '塞尔维亚', '俄罗斯', '塔吉克斯坦', '土库曼斯坦', '乌克兰', '乌兹别克斯坦', 'TR'],
	4: ['葡萄牙', '巴西', '安哥拉'],
	5: ['阿根廷', '巴拉圭', '乌拉圭', '玻利维亚', '智利', '哥伦比亚', '哥斯达黎加', '古巴', '多米尼加共和国', '厄瓜多尔', '萨尔瓦多', '赤道几内亚', '危地马拉', '洪都拉斯', '墨西哥', '尼加拉瓜', '巴拿马', '秘鲁', '西班牙', '委内瑞拉', '波多黎各'],
	6: ['澳大利亚', '加拿大', 'JP', '新西兰', '美国', '南非'],
	7: ['安道尔', '奥地利', '比利时', '瑞士', '捷克', '德国', '丹麦', '芬兰', '法国', '英国', '希腊', '克罗地亚', '匈牙利', '爱尔兰', '冰岛', '意大利', '列支敦士登', '卢森堡', '摩纳哥', '荷兰', '挪威', '波兰', '罗马尼亚'],
	8: ['阿联酋', '巴林', '科摩罗', '吉布提', '阿尔及利亚', '埃及', 'IL', '伊拉克', 'IR', '约旦', '科威特', '黎巴嫩', '利比亚', '摩洛哥', '毛里塔尼亚', '阿曼', '巴勒斯坦', '卡塔尔', '沙特阿拉伯', '苏丹', '索马里', '叙利亚', '突尼斯', '也门'],
	9: ['C1','C2','T2','T3','T4','T5','T6','AG', 'AI', 'AL', 'AN', 'AS', 'AW', 'AW', 'AX', 'BA', 'BB', '布基纳法索', '布隆迪',  '贝宁', 'BM', 'BN', 'BS', '不丹',  '博茨瓦纳', 'BZ,', 'CC', '刚果（金）', '中非共和国',  '刚果', '科特迪瓦', 'CK', '喀麦隆', '中国', '佛得角', 'CW', 'CX', 'CY', 'DM', 'DU', '厄立特里亚',  '埃塞俄比亚', 'FA', 'FJ', 'FM', 'FO', '加蓬', 'GD', '加纳', 'GI', 'GL', '冈比亚', '几内亚', 'GP', 'GU', '几内亚比绍', 'GY',  '香港', 'HT', 'IM', 'JE', 'JM', '肯尼亚', 'KH', 'KI', '科摩罗', 'KN', 'KR', 'KY',  '老挝', 'LC',  '利比里亚', '莱索托', 'ME', '马达加斯加', 'MH', 'MK', '马里', '缅甸', 'MN', '澳门', 'MQ', 'MS', 'MT', 'MU', '马拉维', '莫桑比克', '纳米比亚', 'NC', '尼日尔',  '尼日利亚', 'NR', 'NU', 'PF', 'PG',  '菲律宾', 'PW', '留尼汪岛',  '卢旺达', 'SB', '塞舌尔', 'SI', '塞拉利昂', 'SM',  '塞内加尔', 'SR', 'SS',  '圣多美和普林西比', '斯威士兰', 'TC', '乍得', '多哥', 'TK', 'TL', 'TO', 'TP', 'TT', 'TW', '坦桑尼亚', '乌干达', 'UM', 'VC', 'VG', 'VI', 'VU', 'WF', 'WS', 'XB', 'ZG', '赞比亚', '津巴布韦', 'ZZ']
};
// tabs
// const tabs = ['ALL', '欧洲区', '西语区', '英语区', '葡语区', '中东区', '非洲区', '俄语区', '印度区', '东南亚区', '中国区', '其他区'];
// const tabsList = {
//   0: [],
//   1: ['DE', 'AT', 'HU', 'LI', 'FR', 'MC', 'AD', 'LU', 'BE', 'CH', 'GB', 'IE', 'IS', 'IT', 'HR', 'NL', 'CZ', 'SK', 'PL', 'RO', 'GR', 'NO', 'FI', 'DK', 'SE'],
//   2: ['AR', 'BO' ,'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'ES', 'UY', 'VE'],
//   3: ['US', 'CA', 'AU', 'NZ', 'PR'],
//   4: ['BR', 'PT', 'AO', 'CV', 'GW', 'MZ', 'ST'],
//   5: ['AE', 'BH', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'OM', 'PS', 'QA', 'SA', 'SY', 'TN', 'YE', 'SO', 'SD', 'MR', 'DJ', 'COM', 'DZ'],
//   6: [
//     {name: '非洲区(英语)', v: ['ZA', 'NG', 'BW', 'ET', 'GM', 'GH', 'KE', 'LS', 'LR', 'MW', 'NA', 'SL', 'SZ', 'TZ', 'UG', 'ZW', 'ZM', 'ER']},
//     {name: '非洲区(法语)', v: ['BJ', 'BF', 'BI', 'CM', 'CF', 'TD', 'CG', 'GA', 'GN', 'MG', 'ML', 'NE', 'SN', 'SC', 'TG', 'CD', 'CI', 'KM', 'RE', 'RW']},
//   ],
//   7: ['RU', 'UA', 'BY', 'MD', 'KZ', 'TJ', 'KG', 'UZ', 'TM', 'AM', 'GE', 'AZ', 'LV', 'LT', 'EE', 'BG,', 'RS'],
//   // 8: [
//   //   {name: '南亚区域', v: ['IN', 'MV', 'BD', 'LK', 'NP', 'PK', 'BT']},
//   //   {name: '印地语区域', v: ['N-PB', 'IN-HP', 'IN-CH', 'IN-RJ', 'IN-JH', 'IN-UP', 'IN-DL', 'IN-GJ', 'IN-GA', 'IN-DD', 'IN-UT', 'IN-JK', 'IN-HR', 'IN-BR', 'IN-CT', 'IN-MP', 'IN-UNKNOWN', 'IN-MH', 'IN-DN']},
//   //   {name: '孟加拉语区域', v: ['IN-WB', 'IN-OR', 'IN-MN', 'IN-MZ', 'IN-SK', 'IN-AN', 'IN-AS', 'IN-AR', 'IN-ML', 'IN-NL', 'IN-TR']},
//   //   {name: '卡纳达语区域', v: ['IN-KA']},
//   //   {name: '泰卢固语区域', v: ['IN-TG', 'IN-AP']},
//   //   {name: '泰米尔语区域', v: ['IN-TN', 'IN-LD', 'IN-KL', 'IN-PY']}
//   // ],
//   8: ['IN', 'AF', 'BD', 'LK', 'MV', 'NP', 'PK'],
//   9: ['ID', 'MY', 'PH', 'SG', 'VN', 'TH', 'MM', 'LA', 'TLS'],
//   10: ['CN', 'HK', 'MO'],
//   11: ['AF', 'AG', 'AI', 'AL', 'AN', 'AS', 'AW', 'AX', 'BA', 'BB', 'BM', 'BN', 'BS', 'BZ', 'CC', 'CK', 'CW', 'CX', 'CY', 'DM', 'DU', 'FA', 'FJ', 'FM', 'FO', 'GD', 'GI', 'GL', 'GP', 'GU', 'GY', 'HT', 'IL', 'IM', 'IR', 'JE', 'JM', 'JP', 'KH', 'KI', 'KN', 'KR', 'KY', 'LC', 'ME', 'MH', 'MK', 'MN', 'MQ', 'MS', 'MT', 'MU', 'NC', 'NR', 'NU', 'PF', 'PG', 'PW', 'SB', 'SI', 'SM', 'SR', 'SS', 'TC', 'TK', 'TL', 'TO', 'TP', 'TR', 'TT', 'TW', 'UM', 'VC', 'VG', 'VI', 'VU', 'WF', 'WS', 'XB', 'ZG', 'ZZ', 'ZR', 'SH', 'YT']
// };
const tabs = ['ALL', '印度区', '东南亚区', '俄语区', '葡语区', ' 西语区', '英语区', '欧洲区', ' 中东区', '其他区'];
const tabsList = {
  0: [],
  1: ['IN', 'AF', 'BD', 'LK', 'MV', 'NP', 'PK'],
  2: ['ID', 'MY', 'PH',	'SG', 'TH', 'VN'],
  3: ['AM', 'AZ',	'BG',	'BY', 'EE',	'GE', 'KG', 'KZ', 'LT', 'LV', 'MD', 'RS', 'RU', 'TJ', 'TM', 'UA', 'UZ', 'TR'],
  4: [ 'PT',	 'BR', 'AO'],
  5: [ 'AR',	 'PY',	 'UY',	 'BO',	 'CL',	 'CO',	 'CR', 'CU', 'DO',	 'EC',	 'SV',	 'GQ',	 'GT',	 'HN', 'MX',	 'NI',	 'PA',	 'PE',	 'ES',	 'VE', 'PR'],
  6: ['AU',	 'CA', 'JP',	 'NZ',	 'US',	 'ZA'],
  7: [ 'AD',	 'AT',	 'BE', 'CH',	 'CZ',	 'DE', 'DK', 'FI', 'FR', 'GB', 'GR',	'HR',	'HU', 'IE', 'IS', 'IT',	'LI', 'LU',	'MC', 'NL',	'NO', 'PL',	'RO', 'SE',	'SK'],
  8: ['AE',	 'BH',	 'COM',	 'DJ',	 'DZ',	 'EG',	 'IL', 'IQ',	 'IR', 'JO',	 'KW',	 'LB',	 'LY',	 'MA', 'MR',	 'OM',	 'PS',	 'QA',	 'SA', 'SD',	 'SO', 'SY',	 'TN',	 'YE'],
  9: [ 'C1','C2','T2','T3','T4','T5','T6', 'AG',	 'AI',	 'AL',	 'AN',	 'AS',	 'AW','AX',	 'BA',	 'BB',	 'BF',	 'BI',	 'BJ',	 'BM','BN',	 'BS',	 'BT',	 'BW',	 'BZ',	 'CC',	 'CD','CF',	 'CG',	 'CI',	 'CK',	 'CM',	 'CN',	 'CV','CW',	 'CX',	 'CY',	 'DM',	 'DU',	 'ER',	 'ET','FA',	 'FJ',	 'FM',	 'FO',	 'GA',	 'GD',	 'GH','GI',	 'GL',	 'GM',	 'GN',	 'GP',	 'GU',	 'GW','GY',	 'HK',	 'HT',	 'IM',	 'JE',	 'JM',	 'KE','KH',	 'KI',	 'KM',	 'KN',	 'KR',	 'KY',	 'LA','LC',	 'LR',	 'LS',	 'ME',	 'MG',	 'MH',	 'MK','ML',	 'MM',  'MN',	 'MO'	, 'MQ',	 'MS',	 'MT','MU',	 'MW',	 'MZ',	 'NA',	 'NC',	 'NE',	 'NG','NR',	 'NU',	 'PF',	 'PG',	 'PH',	 'PW',	 'RE','RW',	 'SB',	 'SC',	 'SI',	 'SL',	 'SM',	 'SN','SR',	 'SS',	 'ST',	 'SZ',	 'TC',	 'TD',	 'TG','TK',	 'TL',	 'TO',	 'TP',	 'TT',	 'TW',	 'TZ','UG',	 'UM',	 'VC',	 'VG',	 'VI',	 'VU',	 'WF','WS',  'XB',	 'ZG',	 'ZM',	 'ZW',	 'ZZ']
};

export default {
  props: {
    listArr: String,
    isShowLable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkedList: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
      },
      indeterminate: true,
      plainOptions,
      tabs,
      tabsList,
      checkAll: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
      }
    };
  },
  computed: {
    list() {
      this.initList();
      return this.listArr;
    }
  },
  created() {
    console.log(this.list);
  },
  methods: {
    initList() {
      const list = this.listArr.split('|');
      const table = this.tabsList;
      const allLenth = 234; // 所有国家码总数
      let currentAll = 0;

      for(let k in table) {
        const item = table[k];
        let arr = [];

        if (typeof item[0] === 'string') {
          arr = compare(item);
          if (arr.length > 0) {
            this.checkedList[k] = arr;
            this.checkAll[k] = arr.length === item.length;
          }
        } else {
          let vLen = 0;
          for (let n = 0; n < item.length; n += 1) {
            let sarr = [];
            const nitem = item[n].v;
            vLen += nitem.length;
            sarr = compare(nitem);
            if (sarr.length > 0) {
              const idx = String(k) + String(n);
              this.checkedList[idx] = sarr;
              this.checkAll[idx] = sarr.length === nitem.length;
              arr = [...arr, ...sarr];
            }
          }

          if (arr.length > 0) {
            this.checkedList[k] = arr;
            this.checkAll[k] = arr.length === vLen;
          }
        }

        currentAll += arr.length;
      }

      this.checkAll[0] = currentAll === allLenth;

      // 从item中检索list
      function compare(item) {
        const arr = [];
        for(let i = 0; i < list.length; i += 1) {
          const temp = list[i];
          if (item.includes(temp)) {
            arr.push(temp);
          }
        }

        return arr;
      }
    },
    onChange(index, sindex) {
      let checked;
      if (typeof sindex !== 'undefined') {
        checked = this.checkedList[String(index) + String(sindex)].length === this.tabsList[index][sindex].v.length;
        this.checkAll[String(index) + String(sindex)] = checked;
      } else {
        checked = this.checkedList[index].length === this.tabsList[index].length;
        this.checkAll[index] = checked;
      }

      this.resetTotalALL(checked);
      this.emitList();
    },
    resetTotalALL(checked) {
      // 只要有一个没选，总ALL都不选
      if (!checked) {
        this.checkAll[0] = false;
      } else {
        const l = this.checkedList;
        let allChecked = true;
        for (let k in this.tabsList) {
          const item = this.tabsList[k];

          if (typeof item[0] === 'string') {
            if (l[k].length !== item.length) {
              allChecked = false;
              break;
            }
          } else {
            let vLen = 0;
            for (let i = 0; i < item.length; i += 1) {
              vLen += item[i].v.length;
            }

            if (l[k].length !== vLen) {
              allChecked = false;
              break;
            }
          }
        }

        this.checkAll[0] = allChecked;
      }
    },
    // 设置hover title
    handleChange(activeKey) {
      const idx = activeKey - 1;

      if (idx === 0) return;
      setTimeout(() =>{
        const f = document.querySelectorAll('.ant-tabs-tabpane');
        const subf = f[idx];
        const map = CodesMap[idx];

        if (subf) {
          const codesList = subf.querySelectorAll('.country--code .ant-checkbox-wrapper');
          if (codesList && codesList.length > 0) {
            codesList.forEach((el, index) =>{
              el.setAttribute('title', map[index]);
            });
          }
        }
      }, 500);
    },
    onCheckAllChange(e, index, sindex) {
      const { checked } = e.target;
      const list = this.tabsList[index];

      if (typeof sindex !== 'undefined') {
        this.checkedList[String(index) + String(sindex)] = checked ? list[sindex].v :[];
        this.checkAll[String(index) + String(sindex)] = checked;
        // 这里要更新this.checkedList[index]和this.checkAll[index]
        let arr = [];
        let vLen = 0; // 比如 非洲区，下面所有 item 的 v 的长度之和
        for (let i = 0; i < this.tabsList[index].length; i += 1) {
          const idx = String(index) + String(i);
          arr = [...arr, ...this.checkedList[idx]];
          vLen += this.tabsList[index][i].v.length;
        }

        this.checkedList[index] = arr;
        this.checkAll[index] = arr.length === vLen;
      } else {
        // 全部的ALL
        if (index === 0) {
          if (!checked) {
            for(let k in this.checkedList) {
              this.checkedList[k] = [];
              this.checkAll[k] = false;
            }
          } else {
            for(let i in this.tabsList) {
              const l = this.tabsList[i];
              if (typeof l[0] === 'string') {
                this.checkedList[i] = l;
                this.checkAll[i] = true;
              } else {
                let arr = [];
                for(let k in l) {
                  const { v } = l[k];
                  const idx = String(i) + String(k);
                  arr = [...arr, ...v];
                  this.checkedList[idx] = v;
                  this.checkAll[idx] = true;
                }
                this.checkedList[i] = arr;
                this.checkAll[i] = true;
              }
            }
          }
        // } else if (index === 6 || index === 8) { // 非洲区和印度区
        //   this.handleNesting(index, list, checked);
        } else {
          this.checkedList[index] = checked ? list : [];
          this.checkAll[index] = checked;
        }
      }

      this.resetTotalALL(checked);
      this.emitList();
    },
    emitList() {
      let arr = [];
      for (let i = 0; i < 10; i += 1) {
        arr = [...arr, ...this.checkedList[i]];
      }

      this.$emit('countryCodes', arr.join('|'));
    },
    // 嵌套的处理
    handleNesting(index, list, checked) {
      let arr = [];
      for (const k in list) {
        const { v } = list[k];
        const idx = String(index) + String(k);
        arr = checked ? [...arr, ...v] : [];
        // 不仅要处理嵌套的checkAll和其对应的checkedList的状态
        this.checkAll[idx] = checked;
        this.checkedList[idx] = checked ? v : [];
      }

      // 还要处理外层的checkAll和其对应的checkedList的状态
      this.checkedList[index] = arr;
      this.checkAll[index] = checked;
    }
  },
};
</script>
<style lang="scss">
  .country--group {
    display: flex;
  }
  .country--group_list {
    margin-left: 100px;

    .ant-tabs-nav .ant-tabs-tab {
      margin-right: 5px !important;
    }
  }
  #countryModal .ant-checkbox-wrapper {
    margin-bottom: 10px;
  }

  .no-left {
    margin-left: 0;
  }
</style>