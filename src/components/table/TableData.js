import { Table, Space } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import * as helper from '../../lib/helper';
import CustomButton from '../Button';

const TableData = (props) => {

    const { data, loading, pageSize } = props;

    const columns = [
        {
            title: 'Komoditas',
            dataIndex: 'komoditas',
            key: 'komoditas',
        },
        {
            title: 'Harga',
            dataIndex: 'price',
            key: 'price',
            render: text => <>Rp. { helper.numberFormat(text, ',') }</>
        },
        {
            title: 'Ukuran',
            dataIndex: 'size',
            key: 'size'
        },
        {
            title: 'Area Kota',
            dataIndex: 'area_kota',
            key: 'area_kota',
        },
        {
            title: 'Area Provinsi',
            dataIndex: 'area_provinsi',
            key: 'area_provinsi'
        },
        {
            title: 'Tanggal',
            dataIndex: 'tgl_parsed',
            key: 'tgl_parsed',
            render: text => <>{ helper.dateParser(text) }</>
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space>
                    <CustomButton type="primary" size="default" text="Edit"/>
                    <CustomButton type="danger" size="default" text="Delete"/>
                </Space>
            ),
          },
    ];

    return (
        <Table
            dataSource={ data }
            columns={ columns }
            loading={ loading }
            bordered
        />
    )
}

export default TableData;