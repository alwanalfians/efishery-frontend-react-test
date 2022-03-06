import { Layout } from "antd";
import React, { Component } from "react";
import Header from "../../components/header/Header";
import 'antd/dist/antd.css';
import TableData from "../../components/table/TableData";
import './Home.scss';
import Footer from "../../components/footer/Footer";
import * as fishService from "../../services/fish"

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fish: {
                data: [],
                loading: false
            }
        };
    };

    componentDidMount() {
        this.setState({ fish: { loading: true }})
        fishService.getData().then((response) => {
            this.setState({
                fish: {
                    data: response,
                    loading: false
                }
            });
        });
    };

    render() {
        return (
            <Layout className="layout">
                <Header title="eFishery" subTitle=""/>
                <Layout.Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <TableData
                            data={ this.state.fish.data }
                            loading={ this.state.fish.loading }
                        />
                    </div>
                </Layout.Content>
                <Footer />
            </Layout>
        );
    }
}

export default Home;