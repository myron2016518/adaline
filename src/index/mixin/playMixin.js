import {mapGetters, mapMutations} from 'vuex'
import Empty from 'index/components/empty/Empty.vue'
import Ignore from 'index/components/ignore/Ignore.vue'
import T100U100 from 'index/business_comp/type100/T100U100.vue'
import T100U110 from 'index/business_comp/type100/T100U110.vue'
import T100U120 from 'index/business_comp/type100/T100U120.vue'
import T100U130 from 'index/business_comp/type100/T100U130.vue'
import T100U140 from 'index/business_comp/type100/T100U140.vue'
import T100U150 from 'index/business_comp/type100/T100U150.vue'
import T100U170 from 'index/business_comp/type100/T100U170.vue'
import T100U190 from 'index/business_comp/type100/T100U190.vue'
import T200U210 from 'index/business_comp/type200/T200U210.vue'
import T200U240 from 'index/business_comp/type200/T200U240.vue'
import T300U300 from 'index/business_comp/type300/T300U300.vue'
import T300U330 from 'index/business_comp/type300/T300U330.vue'
import T500U500 from 'index/business_comp/type500/T500U500.vue'
import T600U600 from 'index/business_comp/type600/T600U600.vue'
import T700U700 from 'index/business_comp/type700/T700U700.vue'
import T800U800 from 'index/business_comp/type800/T800U800.vue'
import T900U900 from 'index/business_comp/type900/T900U900.vue'
import T900U1740 from 'index/business_comp/type900/T900U1740.vue'
import T1100U1100 from 'index/business_comp/type1100/T1100U1100.vue'
import T2700U2700 from 'index/business_comp/type2700/T2700U2700.vue'
import T2703U2703 from 'index/business_comp/type2703/T2703U2703.vue'
import T2900U2901 from 'index/business_comp/type2900/T2900U2901.vue'
import T3000U3000 from 'index/business_comp/type3000/T3000U3000.vue'

const ignoreList = ['1000', '1200', '1300', '1400', '1500', '1600', '1700', '1900', '2000', '2600', '2800']
const ingoreComp = ['T100U180']

export const playMixin = {
    methods: {
        /** 判断组件类型 **/
        _getCompType(type, uiType) {
            /** 不做处理 **/
            if (ignoreList.includes(type) || ingoreComp.includes(`T${type}U${uiType}`)) {
                return 'Ignore'
            }
            /** 提示类对话框 **/
            if (type === '100') {
                if (uiType === '90' || uiType === '100') {
                    return 'T100U100'               // 无按钮对话框
                } else if (uiType === '110') {
                    return 'T100U110'               // 确定按钮对话框
                } else if (uiType === '120') {
                    return 'T100U120'               // 2个按钮对话框，按钮文字分别是：确定、取消
                } else if (uiType === '130') {
                    return 'T100U130'               // 2个按钮对话框，按钮文字分别是：是、否
                } else if (uiType === '140') {
                    return 'T100U140'               // 2个按钮对话框，按钮文字分别是：重试、取消
                } else if (uiType === '150') {
                    return 'T100U150'               // 无按钮对话框，退出诊断
                } else if (uiType === '170') {
                    return 'T100U170'               // 百分比进度等待框
                } else if (uiType === '190') {
                    return 'T100U190'               // 反馈功能对话框：2个按钮，显示”是”，”反馈
                }
            }
            /** 输入对话框 **/
            if (type === '200') {
                if (uiType === '210' || uiType === '220' || uiType === '230') {
                    return 'T200U210'               // 一个确定按钮的输入对话框
                } else if (uiType === '240' || uiType === '245') {
                    return 'T200U240'               // 两个按钮的输入对话框：确定、取消
                }
            }
            /** 菜单界面 **/
            if (type === '300') {
                if (uiType === '300') {
                    return 'T300U300'
                } else if (uiType === '330') {
                    return 'T300U330'
                }
            }
            /** 数据流选择 **/
            if (type === '500') {
                if (uiType === '500') {
                    return 'T500U500'
                }
            }
            /** 动作测试 **/
            if (type === '600') {
                if (uiType === '600' || uiType === '610') {
                    return 'T600U600'
                }
            }
            /** 读故障码 **/
            if (type === '700') {
                if (uiType === '700' || uiType === '710' || uiType === '720' || uiType === '730' || uiType === '740' || uiType === '760') {
                    return 'T700U700'
                }
            }
            /** 数据流 **/
            if (type === '800') {
                if (uiType === '800' || uiType === '810') {
                    return 'T800U800'
                }
            }
            /** 分页数据流 **/
            if (type === '900') {
                if (uiType === '900') {
                    return 'T900U900'
                } else if (uiType === '1740') {
                    return 'T900U1740'
                }
            }
            /** 特殊功能 **/
            if (type === '1100') {
                if (uiType === '1100') {
                    return 'T1100U1100'
                }
            }
            /** 导航 **/
            if (type === '1800') {
                if (uiType === '1800') {
                    return 'navigation'
                }
            }
            /** 下载文件对话框 **/
            if (type === '2700') {
                if (uiType === '2700') {
                    return 'T2700U2700'
                }
            }
            /** 正在处理数据对话框 **/
            if (type === '2703') {
                if (uiType === '2703') {
                    return 'T2703U2703'
                }
            }
            /** 到网站数据库中查询信息 **/
            if (type === '2900') {
                if (uiType === '2901') {
                    return 'T2900U2901'
                }
            }
            /** 诊断转发数据 **/
            if (type === '3000') {
                if (uiType === '3000') {
                    return 'T3000U3000'
                }
            }
            console.log('未做 ', type, '：', uiType)
            this.setNotWork(`T${type} U${uiType}`);
            return 'Empty'
        },
        ...mapMutations({
            setNotWork: 'SET_NOT_WORK'
        }),
    },
    components: {
        Empty,
        Ignore,
        T100U100,
        T100U110,
        T100U120,
        T100U130,
        T100U140,
        T100U150,
        T100U170,
        T100U190,
        T200U210,
        T200U240,
        T300U300,
        T300U330,
        T500U500,
        T600U600,
        T700U700,
        T800U800,
        T900U900,
        T900U1740,
        T1100U1100,
        T2700U2700,
        T2703U2703,
        T2900U2901,
        T3000U3000,
    }
}
