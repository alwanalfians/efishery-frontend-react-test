import { Layout } from "antd";
import React, { Component } from "react";
import Header from "../../components/header/Header";
import 'antd/dist/antd.css';
import TableData from "../../components/table/TableData";
import './Home.scss';
import Footer from "../../components/footer/Footer";
import * as fishService from "../../services/fish";
import { connect } from "react-redux";

class Home extends Component {

    componentDidMount() {
        this.props.getData()
    };

    render() {
        const { fishData, createData, updateData, deleteData } = this.props

        return (
            <Layout className="layout">
                <Header />
                <Layout.Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <TableData
                            data={ fishData }
                            createData={ createData }
                            updateData={ updateData }
                            deleteData={ deleteData }
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

export default connect(mapStateToProps, fishService)(Home);