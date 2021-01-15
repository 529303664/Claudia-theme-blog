const data = {
    "countries": {
        "FR": "法国",
        "BE": "比利时",
        "DE": "德国",
        "CH": "瑞士",
        "AT": "奥地利",
        "BD": "孟加拉",
        "NP": "尼泊尔",
        "SA": "沙特",
        "AE": "阿联酋",
        "KW": "科威特",
        "IQ": "伊拉克",
        "QA": "卡塔尔",
        "BH": "巴林",
        "YE": "也门",
        "OM": "阿曼",
        "JO": "约旦",
        "SY": "叙利亚",
        "LB": "黎巴嫩",
        "EG": "埃及",
        "LY": "利比亚",
        "TN": "突尼斯",
        "DZ": "阿尔及利亚",
        "MA": "摩洛哥",
        "SD": "苏丹",
        "MR": "毛里塔尼亚",
        "SO": "索马里",
        "DJ": "吉布提",
        "KM": "科摩罗",
        "PS": "巴勒斯坦",
        "IR": "伊朗",
        "IL": "以色列",
        "CY": "塞浦路斯",
        "NG": "尼日利亚",
        "CO": "哥伦比亚",
        "MX": "墨西哥",
        "AR": "阿根廷",
        "ES": "西班牙",
        "CL": "智利",
        "PE": "秘鲁",
        "EC": "厄瓜多尔",
        "CR": "哥斯达黎加",
        "UY": "乌拉圭",
        "PY": "巴拉圭",
        "VE": "委内瑞拉",
        "BO": "玻利维亚",
        "GT": "危地马拉",
        "DO": "多米尼加共和国",
        "PA": "巴拿马",
        "SV": "萨尔瓦多",
        "HN": "洪都拉斯",
        "NI": "尼加拉瓜",
        "CU": "古巴",
        "PR": "波多黎各",
        "BR": "巴西",
        "AO": "安哥拉",
        "PT": "葡萄牙",
        "MY": "马来西亚",
        "BN": "文莱",
        "RU": "俄罗斯",
        "BY": "白俄罗斯",
        "UA": "乌克兰",
        "UZ": "乌兹别克斯坦",
        "KZ": "哈萨克斯坦",
        "TM": "土库曼斯坦",
        "KG": "吉尔吉斯斯坦",
        "TJ": "塔吉克斯坦",
        "AM": "亚美尼亚",
        "GE": "格鲁吉亚",
        "AZ": "阿塞拜疆",
        "MD": "摩尔多瓦",
        "EE": "爱沙尼亚",
        "BG": "保加利亚",
        "RS": "塞尔维亚",
        "AU": "澳大利亚",
        "NZ": "新西兰",
        "PG": "巴布亚新几内亚",
        "TO": "汤加",
        "WS": "萨摩亚",
        "FJ": "斐济",
        "GU": "关岛",
        "SB": "所罗门群岛",
        "NC": "新喀里多尼亚",
        "PF": "法属波利尼西亚",
        "PW": "帕劳",
        "AS": "美属萨摩亚",
        "FM": "密克罗尼西亚联邦",
        "TK": "托克劳",
        "MP": "北马里亚纳群岛",
        "CK": "库克群岛",
        "VU": "瓦努阿图",
        "MH": "马绍尔群岛",
        "KI": "基里巴斯",
        "NR": "瑙鲁",
        "TV": "图瓦卢",
        "NU": "纽埃",
        "NF": "诺福克岛",
        "WF": "瓦利斯和富图纳",
        "PN": "皮特凯恩群岛",
        "CN": "中国",
        "TW": "台湾",
        "HK": "香港",
        "MO": "澳门",
        "SG": "新加坡",
        "JP": "日本",
        "KR": "韩国",
        "VN": "越南",
        "ID": "印尼",
        "TR": "土耳其",
        "MM": "缅甸",
        "KH": "柬埔寨",
        "IN": "印度",
        "PK": "巴基斯坦",
        "PH": "菲律宾",
        "IT": "意大利",
        "ZA": "南非",
        "US": "美国",
        "CA": "加拿大",
        "GB": "英国",
        "TH": "泰国",
        "LA": "老挝",
        "FI": "芬兰",
        "NL": "荷兰",
        "SE": "瑞典",
        "PL": "波兰",
        "CD": "刚果金",
        "CG": "刚果",
        "CZ": "捷克",
        "DK": "丹麦",
        "GR": "希腊",
        "HU": "匈牙利",
        "IE": "爱尔兰",
        "IS": "冰岛",
        "LT": "立陶宛",
        "LU": "卢森堡",
        "MC": "摩纳哥",
        "MN": "蒙古",
        "MV": "马尔代夫",
        "NO": "挪威",
        "RO": "罗马尼亚",
        "ZM": "赞比亚",
        "AD": "安道尔共和国",
        "AF": "阿富汗",
        "AL": "阿尔巴尼亚",
        "AW": "阿鲁巴",
        "AX": "美属萨摩亚",
        "BA": "波斯尼亚和黑塞哥维那",
        "BB": "巴巴多斯",
        "BF": "布基纳法索",
        "BJ": "贝宁",
        "BM": "百慕大群岛",
        "BS": "巴哈马",
        "BT": "不丹",
        "BW": "博茨瓦纳",
        "BZ": "伯利兹",
        "CI": "科特迪瓦",
        "CM": "喀麦隆",
        "CX": "圣诞岛",
        "ET": "埃塞俄比亚",
        "GA": "加蓬",
        "GF": "法属圭亚那",
        "GH": "加纳",
        "GI": "直布罗陀",
        "GM": "冈比亚",
        "GN": "几内亚",
        "GP": "瓜德罗普岛",
        "GQ": "赤道几内亚",
        "GY": "圭亚那",
        "HR": "克罗地亚",
        "HT": "海地",
        "IM": "马恩岛",
        "JM": "牙买加",
        "KE": "肯尼亚",
        "KN": "圣基茨和尼维斯",
        "LI": "列支敦士登",
        "LK": "斯里兰卡",
        "LR": "利比里亚",
        "LV": "拉脱维亚",
        "ME": "黑山",
        "MG": "马达加斯加",
        "MK": "北马其顿",
        "ML": "马里",
        "MQ": "马提尼克岛",
        "MT": "马耳他",
        "MU": "毛里求斯",
        "MW": "马拉维",
        "MZ": "莫桑比克",
        "NA": "纳米比亚",
        "NE": "尼日尔",
        "RE": "留尼汪岛",
        "SC": "塞舌尔",
        "SI": "斯洛语尼亚",
        "SK": "斯洛伐克",
        "SL": "塞拉利昂",
        "SN": "塞内加尔",
        "SR": "苏里南",
        "SS": "南苏丹",
        "TG": "多哥",
        "TL": "东帝汶",
        "TT": "特立尼达和多巴哥",
        "TZ": "坦桑尼亚",
        "UG": "乌干达",
        "VC": "圣语森特",
        "ZW": "津巴布韦"
    },
    "areaList": {
        "A_FR": {
            "name": "法语区",
            "countryList": [
                "FR",
                "BE"
            ],
            "showTab": 1
        },
        "A_DE": {
            "name": "德语区",
            "countryList": [
                "DE",
                "CH",
                "AT"
            ],
            "showTab": 1
        },
        "A_BD": {
            "name": "孟尼",
            "countryList": [
                "BD",
                "NP"
            ],
            "showTab": 1
        },
        "MENA": {
            "name": "中东",
            "countryList": [
                "SA",
                "AE",
                "KW",
                "IQ",
                "QA",
                "BH",
                "YE",
                "OM",
                "JO",
                "SY",
                "LB",
                "EG",
                "LY",
                "TN",
                "DZ",
                "MA",
                "SD",
                "SO",
                "DJ",
                "PS"
            ],
            "showTab": 1
        },
        "A_ES": {
            "name": "西语区",
            "countryList": [
                "CO",
                "MX",
                "AR",
                "ES",
                "CL",
                "PE",
                "EC",
                "CR",
                "UY",
                "PY",
                "VE",
                "BO",
                "GT",
                "DO",
                "PA",
                "SV",
                "HN",
                "NI",
                "CU",
                "PR"
            ],
            "showTab": 1
        },
        "A_BR": {
            "name": "葡语区",
            "countryList": [
                "BR",
                "AO",
                "PT"
            ],
            "showTab": 1
        },
        "A_MY": {
            "name": "马文",
            "countryList": [
                "MY",
                "BN"
            ],
            "showTab": 1
        },
        "A_RU": {
            "name": "俄语区",
            "countryList": [
                "RU",
                "BY",
                "UA",
                "UZ",
                "KZ",
                "TM",
                "KG",
                "TJ",
                "AM",
                "GE",
                "AZ",
                "MD"
            ],
            "showTab": 1
        },
        "A_CN": {
            "name": "华语区",
            "countryList": [
                "CN",
                "TW",
                "HK",
                "MO",
                "SG"
            ],
            "showTab": 1
        },
        "A_JP": {
            "name": "日本",
            "countryList": [
                "JP"
            ]
        },
        "A_KR": {
            "name": "韩国",
            "countryList": [
                "KR"
            ]
        },
        "A_VN": {
            "name": "越南",
            "countryList": [
                "VN"
            ]
        },
        "A_ID": {
            "name": "印尼",
            "countryList": [
                "ID"
            ]
        },
        "A_TR": {
            "name": "土耳其",
            "countryList": [
                "TR"
            ]
        },
        "A_MM": {
            "name": "缅甸",
            "countryList": [
                "MM"
            ]
        },
        "A_KH": {
            "name": "柬埔寨",
            "countryList": [
                "KH"
            ]
        },
        "A_IN": {
            "name": "印度",
            "countryList": [
                "IN"
            ]
        },
        "A_PK": {
            "name": "巴基斯坦",
            "countryList": [
                "PK"
            ]
        },
        "A_PH": {
            "name": "菲律宾",
            "countryList": [
                "PH"
            ]
        },
        "A_IT": {
            "name": "意大利",
            "countryList": [
                "IT"
            ]
        },
        "A_ZA": {
            "name": "非洲区",
            "countryList": [
                "ZA",
                "NG",
                "GH",
                "KE"
            ],
            "showTab": 1
        },
        "A_EN": {
            "name": "英语区",
            "countryList": [
                "US",
                "CA",
                "GB",
                "IE"
            ],
            "showTab": 1
        },
        "A_AU": {
            "name": "澳新",
            "countryList": [
                "AU",
                "NZ",
                "PG",
                "TO",
                "WS",
                "FJ",
                "GU",
                "SB",
                "NC",
                "PF",
                "PW",
                "AS",
                "FM",
                "TK",
                "MP",
                "CK",
                "VU",
                "MH",
                "KI",
                "NR",
                "TV",
                "NU",
                "NF",
                "WF",
                "PN",
            ],
            "showTab": 1
        },
        "A_TH": {
            "name": "泰国&老挝",
            "countryList": [
                "TH",
                "LA"
            ],
            "showTab": 1
        },
        "A_NL": {
            "name": "北欧",
            "countryList": [
                "NL",
                "SE",
                "FI",
                "DK",
                "NO"
            ],
            "showTab": 1
        },
        "A_PL": {
            "showTab": 1,
            "name": "波兰",
            "countryList": [
                "PL",
                "RO"
            ]
        },
        "A_OTHER": {
            "showTab": 1,
            "name": "其他",
            "countryList": ["MR","KM","IR","IL","CY","EE","BG","RS","CD","CG","CZ","GR","HU","IS","LT","LU","MC","MN","MV","ZM","AD","AF","AL","AW","AX","BA","BB","BF","BJ","BM","BS","BT","BW","BZ","CI","CM","CX","ET","GA","GF","GI","GM","GN","GP","GQ","GY","HR","HT","IM","JM","KN","LI","LK","LR","LV","ME","MG","MK","ML","MQ","MT","MU","MW","MZ","NA","NE","RE","SC","SI","SK","SL","SN","SR","SS","TG","TL","TT","TZ","UG","VC","ZW"]
        }
    }
}
const res = [];

Object.keys(data.areaList).map(area_code => {
    const { showTab, countryList, name } = data.areaList[area_code];
    countryList.map(country => {
        res.push({
            value: country,
            showTab,
            areaCode: area_code,
            area: name,
            label: `${data.countries[country]}`
        })
    })
})
const inKeys = res.map(item => item.value);
const otherList = [];
Object.keys(data.countries).filter(code => !inKeys.includes(code)).map(code => {
    otherList.push(code)
    res.push({
        value: code,
        label: data.countries[code],
        areaCode: 'A_OTHER',
        area: '其他'
    })
})
console.log(JSON.stringify(otherList))
export const countries = data.countries;
export const areaList = data.areaList;
export default res;
