import React from 'react';
import { Avatar, Popover, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { createFromIconfontCN } from '@ant-design/icons';
import logo from '@/assets/logo.png';
import styles from './base-layout.less';
import { NavLink, patchRoutes } from 'umi';
// import menus from '@/configs/router'
import _ from 'lodash';
import { getUser } from '@/utils/dict';
import { history } from 'umi';
const IconFont = createFromIconfontCN();

export default class Component extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            // 布局配置
            settings: {
                fixSiderbar: true,
                // navTheme: "realDark",
                layout: "top",
                contentWidth: "Fixed",
                headerHeight: 48,
                // primaryColor: "#1890ff",
                splitMenus: false,
            },
            user: {},
            routes: [],
        };
    }

    componentDidMount = async () => {
        if(!localStorage.getItem('token')){
            history.push('/login')
        }

        const user = await getUser();
        const routes = this.getRoutes();
        this.setState({
            user,
            routes,
        });
    }

    getRoutes = () => {
        let routes = [];
        try {
            routes = JSON.parse(localStorage.getItem('routes'));
        } catch (error) {
            message.warning('获取路由列表失败');
            console.error(error);
        }
        return routes;
    }

    getMenus = async () => {
        const menus = await this.getRoutes();

        // 获取一下 menus
        const loopMenuItem = (menus) => {
            return _.map(menus, ({ icon, path, name, title, routes, hideInMenu }) => {
                if(!hideInMenu){
                    return {
                        path,
                        icon,
                        name: name || title,
                        routes: routes && loopMenuItem(routes),
                    }}
                }
            );
        };

        return loopMenuItem(menus);
    }

    handleLogout = () => {
        // 退出登录
        localStorage.clear();
        sessionStorage.clear();
    }

    rightContentRender = () => {
        const content = (
            <div className={styles.avatorPopverContent}>
                <p>
                    <NavLink to="/my">
                        <IconFont type='icon-wode-wode' />
                        <span>我的主页</span>
                    </NavLink>
                </p>
                <p>
                    <NavLink onClick={this.handleLogout} to="/login">
                        <IconFont type='icon-logout' />
                        <span>退出登录</span>
                    </NavLink>
                </p>
            </div>
        );
        return (<div>
            <Popover placement="bottomRight" content={content} trigger="click">
                <Avatar
                    shape="square"
                    size="64"
                    style={{ backgroundColor: '#1890ff', cursor: 'pointer' }} >
                    {this.state.user?.name || <UserOutlined />}
                </Avatar>
            </Popover>
        </div>);
    }

    renderProLayout = () => {
        return (<ProLayout
            title="智能分析系统"
            logo={logo}
            location={{
                pathname: this.props.location.pathname,
            }}
            iconfontUrl="//at.alicdn.com/t/font_3233226_3p8l9bdzcdf.js"
            menu={{ request: async () => this.getMenus() }}
            menuItemRender={(item, dom) => (
                <NavLink to={item.path}>{dom}</NavLink>
            )}
            rightContentRender={this.rightContentRender}
            {...this.state.settings}
        >
            {this.props.children}
        </ProLayout>);
    }

    renderSettingDrawer = () => {
        return (<SettingDrawer
            pathname={this.state.pathname}
            enableDarkTheme
            getContainer={() => document.getElementById('baseLayout')}
            settings={this.state.settings}
            onSettingChange={(changeSetting) => {
                this.setState({
                    settings: changeSetting,
                });
            }}
            disableUrlParams={false}
        />);
    }

    render = () => {
        return (<div
            id="baseLayout"
            className={styles.baseLayout}>
            {this.renderProLayout()}
            {this.renderSettingDrawer()}
        </div>);
    }
}