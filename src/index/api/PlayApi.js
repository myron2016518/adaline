import Http from 'index/common/js/Http.js';
import {getUrlString} from 'index/common/js/util.js'

const mockContent = JSON.stringify(
    {
        "ver": "0",
        "type": "900",
        "data": {
            "ui_type": "1740",
            "isFromEx": true,
            "title": "菜单",
            "pagecount": 4,
            "count": 4,
            "menudata": [
                {
                "title": "电源电压，安全气囊控制单元",
                "value": "确定",
                "help": "- 正确 - 测量值与规格相符 - 过低 - 测量值过低 - 过高 - 测量值过高",
                "unit": "",
                "id": "10000167"
                },
                {
                "title": "端子 15 电源 - 测量值",
                "value": "13.6",
                "help": "",
                "unit": "伏特",
                "id": "10000168"
                },
                {
                "title": "启动尝试",
                "value": "0",
                "help": "已经锁定的控制单元的启动尝试次数。",
                "unit": "",
                "id": "1000016c"
                },
                {"title": "事件 - 应答", "value": "停用", "help": "", "unit": "", "id": "10000162"}
            ]
        }
    }
)
const mockData = {
    play_id: "45",
    base_id: "1",
    language: "CN",
    timestamp: "0",
    stay_length: "1000",
    parent_model_id: null,
    children_model_id: null,
    content: mockContent,
    interface_selected_order: "4",
    button_selected_order: "1,5"
}

export class PlayApi extends Http {
    /** 获得播放数据 **/
    getPlayData(base_id, cc, sign) {
        return new Promise((resolve, reject) => {
            const params = {
                base_id,
                cc,
                sign
            }
            this.$get('/LearningMachine/Playback/getInteractiveData', params).then((data) => {
                // data.push(mockData)
                if (data.length > 0) {
                    // var data = data.slice(206, 207)
                    // console.log(data.length)
                    for (let i = 0; i < data.length; i++) {
                        let str = data[i].content
                        if (str) {
                            str = str.replace(/(\\r\\n){2,}/g, '<br><br>')
                            str = str.replace(/(\\n){2,}/g, '<br><br>')
                            str = str.replace(/\\r\\n/g, '<br>')
                            str = str.replace(/\\n/g, '<br>')
                            str = str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
                            // str = '{"ver":"0","type":"1100","data":{"ui_type":"1100","title":"长编码帮助","colums":2,"btn_rows":2,"menutitle":[{"title":"当前状态","model":2,"scale":15}, {"title":"长编码帮助","model":2,"scale":85}],"menudata":[{"value":" "}, {"value":"字节 02 十六进制: EB 二进制: 11101011"}, {"value":"已选"}, {"value":"位 0,中控锁/后盖：软触摸"}, {"value":"未选"}, {"value":"位 2,端子15打开时遥控未激活"Terminal 15 ON"启动"}],"buttondata":[{"title":"返回","cmd":0}, {"title":"保存","cmd":1}],"rows":3}}'
                            // console.log(data[i])
                            // console.log(str)
                            data[i].content = JSON.parse(str)
                        }
                        data[i].type = data[i].content.type
                        data[i].ui_type = data[i].content.data.ui_type
                        if (data[i].content.data.type != null) {
                            data[i].child_type = data[i].content.data.type
                        }
                    }
                    // resolve(data.slice(76, 77))
                    // resolve(data.slice(47, 48))
                    resolve(data)
                } else {
                    reject(`Empty Data，ID：${getUrlString('base_id')}`)
                }
            }).catch((err) => {
                reject(`${err}, ID：${getUrlString('base_id')}`)
            })
        })
    }
}
