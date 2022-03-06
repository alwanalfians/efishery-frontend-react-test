import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { render } from '@testing-library/react';

const TestTable = () => {
    const SteinStore = require("stein-js-client");

    const [dataSource, setDataSource] = useState([])

    const store = new SteinStore("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4");

    const columns = [
        {
        title: 'Name',
        dataIndex: 'name',
        key: 'price',
        },
        {
        title: 'Age',
        dataIndex: 'age',
        key: 'size',
        },
        {
        title: 'Address',
        dataIndex: 'address',
        key: 'area_kota',
        },
    ];

    useEffect(() => {
        store.read("list", { limit: 10, offset: 2 }).then(data => {
            setDataSource(data);
            console.log(data);
        });
    }, [])

    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}

export default TestTable;