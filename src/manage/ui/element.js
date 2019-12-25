import Vue from 'vue';
import {
    Button,
    Input,
    Select,
    Option,
    Dialog,
    Table,
    TableColumn,
    CheckboxGroup,
    Checkbox,
    Form,
    FormItem,
    Container,
    Aside,
    Main,
    Header,
    Footer,
    Badge,
    Menu,
    MenuItem,
    Submenu,
    DatePicker,
    Pagination,
    RadioGroup,
    Radio,
    Loading,
    Tabs,
    TabPane,
    InputNumber,
    Popover,
    Image,
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Badge);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Loading);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(InputNumber);
Vue.use(Popover);
Vue.use(Image);

import {
    Message,
    MessageBox,
} from 'element-ui';

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
