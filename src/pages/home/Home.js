import { Layout } from "antd";
import React, { Component, useState } from "react";
import Header from "../../components/header/Header";
import 'antd/dist/antd.css';
import TableData from "../../components/table/TableData";
import './Home.scss';
import Footer from "../../components/footer/Footer";
import * as fishService from "../../services/fish";
import { connect } from "react-redux";

class Home extends Component {

    componentDidMount() {
        this.props.getFishData()
    };

    render() {
        return (
            <Layout className="layout">
                <Header />
                <Layout.Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <TableData
                            data={ this.props.fishData }
                        />
                    </div>
                </Layout.Content>
                <Footer />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fishData: state.state.fishData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFishData: () => {
            fishService.getData().then((res) => {
                dispatch({
                    type: 'GET_FISH_DATA',
                    data: res
                })
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);