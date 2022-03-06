import { Layout } from "antd";
import React, { Component } from "react";
import Header from "../../components/header/Header";
import 'antd/dist/antd.css';

class Home extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header title="eFishery" subTitle=""/>
            </Layout>
        );
    }
}

export default Home;