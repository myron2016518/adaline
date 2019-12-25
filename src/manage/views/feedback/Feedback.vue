<template>
    <div class="wrapper manage">
        <el-form class="ope-form" ref="ruleForm" :model="ruleForm" inline @keyup.enter.native="submitSearch($event)">
            <el-form-item label="反馈类型">
                <el-select v-model="ruleForm.type" placeholder="请选择" clearable>
                    <el-option label="模拟" :value="FEEDBACK_TYPE.simulation"></el-option>
                    <el-option label="回放" :value="FEEDBACK_TYPE.adaline"></el-option>
                    <el-option label="其他" :value="FEEDBACK_TYPE.other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="ruleForm.status" placeholder="请选择" clearable>
                    <el-option label="未解决" :value="STATUS.not"></el-option>
                    <el-option label="已解决" :value="STATUS.yes"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="反馈时间">
                <el-date-picker class="data-picker" v-model="ruleForm.feedBackDate" :picker-options="dataPickerOptions"
                                align="right" :editable="false" type="date" value-format="yyyy-MM-dd"
                                placeholder="反馈时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button ref="searchBtn" style="letter-spacing: 1px;" type="danger"
                           @click="submitSearch($event)">搜索
                </el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button ref="exportExcelBtn" type="success" style="letter-spacing: 1px;" @click="exportDialogVisible = true">导出</el-button>
                <el-button ref="noticeSetBtn" type="primary" style="letter-spacing: 1px;">自动通知设置</el-button>
            </el-form-item>
        </el-form>
        <div ref="content" class="content" v-loading="listLoading">
            <div class="alert alert-warning" v-if="listError">
                <h4><i class="fa fa-warning"></i> 提示：</h4>
                {{listError}}
            </div>
            <el-table
                    v-else :data="list"
                    :stripe="true" :highlight-current-row="true" height="100%" style="width: 100%">
                <el-table-column label="反馈人" prop="feedback_person" align="center" header-align="center" width="64"></el-table-column>
                <el-table-column label="类型" align="center" header-align="center" prop="feedback_type" min-width="50"></el-table-column>
                <el-table-column label="品牌" prop="make"></el-table-column>
                <el-table-column label="车型" prop="model"></el-table-column>
                <el-table-column prop="desc" min-width="120">
                    <template slot="header" slot-scope="scope">
                        问题描述<i class='el-icon-picture icon-pic'></i>
                    </template>
                    <template slot-scope="scope">
                        <el-popover
                                placement="top"
                                width="324"
                                @show="popoverImgVisible = true"
                                @after-leave="popoverImgVisible = false"
                                trigger="click">
                            <div class="popover-content">
                                <p class="desc">{{scope.row.desc}}</p>
                                <div class="img-wrapper" v-if="popoverImgVisible">
                                    <el-image
                                            v-for="(img, index) in scope.row.imgs" :key="index"
                                            class="img"
                                            :preview-src-list="[img]" :src="img"
                                            fit="cover" @close="true"></el-image>
                                    <div class="img" v-if="scope.row.imgs.length"></div>
                                </div>

                            </div>
                            <p class="problem-desc" slot="reference">{{scope.row.desc}}</p>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="反馈时间" prop="feedback_date" align="center" header-align="center" min-width="88"></el-table-column>
                <el-table-column label="解决时间" prop="resolve_date" align="center" header-align="center" min-width="88"></el-table-column>
                <el-table-column label="状态" prop="status" align="center" header-align="center" min-width="64"></el-table-column>
                <el-table-column label="处理人" prop="hander" align="center" header-align="center" min-width="64"></el-table-column>
                <el-table-column label="操作" align="center" header-align="center" width="96">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="onResolve(scope.$index, scope.row)">已解决
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--        <div class="footer" v-if="list.length > 0">-->
        <div class="footer">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pagesize"
                    layout="total, prev, pager, next, jumper"
                    :total="totalNum*1">
            </el-pagination>
        </div>
        <resolved-dialog ref="resolveDialog" :visible="resolveDialogVisible" @close="resolveDialogVisible = false"></resolved-dialog>
        <export-dialog :visible="exportDialogVisible" @close="exportDialogVisible = false"
                       :FEEDBACK_TYPE="FEEDBACK_TYPE" :STATUS="STATUS" :dataPickerOptions="dataPickerOptions"></export-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {throttle} from 'lodash-es';
    import {configThrottle, formatDate} from 'manage/common/js/util.js';
    import ResolvedDialog from 'manage/views/feedback/ResolvedDialog.vue';
    import ExportDialog from 'manage/views/feedback/ExportDialog.vue';

    const dataPickerOptions = {
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
        shortcuts: [
            {
                text: '今天', onClick(picker) {
                    picker.$emit('pick', new Date());
                },
            },
            {
                text: '昨天', onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                },
            },
            {
                text: '前天', onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
                    picker.$emit('pick', date);
                },
            },
        ],
    };
    const FEEDBACK_TYPE = {simulation: '1', adaline: '2', other: '3'};
    const STATUS = {not: '1', yes: '2'};

    export default {
        name: 'Feedback',
        data() {
            return {
                totalNum: 0,
                pagesize: 10,
                pageNum: 1,
                resolveDialogVisible: false,    // 已解决对话框是否显示
                exportDialogVisible: false,     // 导出对话框是否显示
                popoverImgVisible: false,       // 用来将表格里popver里的图片做懒加载优化
                listLoading: false,             // 表格列表loading
                listError: '',                  // 表格列表接口是否错误
                list: [
                    {
                        feedback_person: '刘大妈',
                        feedback_type: '模拟',
                        make: '五十铃(重型车)',
                        model: 'Range Rover Sport [揽胜运动版]',
                        desc: '太伟大了，太了不起了，这么大的bug，咋搞？太伟大了，太了不起了，这么大的bug，咋搞？',
                        feedback_date: '2019-05-06 12:13:14',
                        resolve_date: '2019-05-06 12:13:14',
                        status: '已解决',
                        hander: '李大爷',
                        imgs: [
                            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                        ],
                    },
                ], // 表格列表数据
                ruleForm: {
                    type: '',
                    status: '',
                    feedBackDate: '',
                },
                search: {
                    type: '',
                    status: '',
                    feedBackDate: '',
                },
            };
        },
        created() {
            this.FEEDBACK_TYPE = FEEDBACK_TYPE;
            this.STATUS = STATUS;
            this.dataPickerOptions = dataPickerOptions;
        },
        methods: {
            /** 搜索 **/
            submitSearch: throttle(function(event) {
                const _target = event.target;
                if (event.keyCode === 13 &&
                    (_target === this.$refs.searchBtn.$el || _target === this.$refs.exportExcelBtn.$el || _target ===
                        this.$refs.noticeSetBtn.$el)) {
                    return false;
                }
                for (let key in this.ruleForm) {
                    this.search[key] = this.ruleForm[key];
                }
                this.pageNum = 1;
                this._renderTable(this.pageNum, this.pagesize, {
                    ...this.search, feedBackDate: (this.search.feedBackDate + '').slice(0, 10),
                });
            }, 1000, configThrottle),
            /** 分页里，页码改变的回调 **/
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum;
                this._renderTable(pageNum, this.pagesize, {
                    ...this.search, feedBackDate: (this.search.feedBackDate + '').slice(0, 10),
                });
            },
            /** 已解决 **/
            onResolve(index, row) {
                this.resolveDialogVisible = true;
                this.$refs.resolveDialog.$el.style.bottom = '0';
            },
            /** 渲染表格 **/
            _renderTable(pageNum, pagesize, rest) {
                const params = {};
                for (let key in rest) {
                    if (rest[key] !== '' && rest[key] !== 'null') {
                        params[key] = rest[key];
                    }
                }
                this.listLoading = true;
                this.$refs.content.scrollTop = 0;
                this.listError = '';
            },
            _reset() {
                this.pageNum = 1;
                this.ruleForm = {
                    type: '', status: '', feedBackDate: '',
                };
                this.search = {                 // 保存搜索表单
                    type: '', status: '', feedBackDate: '',
                };
            },
        },
        components: {
            ResolvedDialog,
            ExportDialog,
        },
    };
</script>

<style scoped lang="scss">
    @import "~manage/common/scss/variable.scss";
    @import "~manage/common/scss/mixin.scss";

    .ope-form {
        position: relative;
        padding: 16px 16px 0 16px;
        box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
        z-index: 1;

        .el-form-item {
            margin-bottom: 16px;
        }
    }

    .problem-desc {
        color: #409eff;
        cursor: pointer;
        @include text-ellipsis();
        z-index: 3000;

        &:hover {
            color: #66b1ff;
        }
    }

    .icon-pic {
        position: relative;
        left: 16px;
        font-size: 22px;
        color: $color-warning
    }

    .popover-content {
        max-height: 320px;
        overflow-y: auto;

        .desc {
            font-size: $size-md;
            line-height: $line-height;
        }

        .img-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .img {
                display: block;
                margin-top: 12px;
                width: 100px;
                height: 100px;
            }

        }

    }
</style>
