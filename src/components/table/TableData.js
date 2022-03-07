import { Table, Space, Row, Col, Input, Modal, Button, Typography } from 'antd';
import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import * as helper from '../../lib/helper';
import * as fishService from '../../services/fish';
import CustomButton from '../Button';
import './TableData.scss';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class TableData extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            searchText: '',
            commodity: '',
            province: '',
            city: '',
            size: '',
            price: '',
            uuid: '',
            formType: '',
            showForm: false,
            sizeDataList: [],
            areaDataList: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fishService.getDataSize().then((response) => {
            if (response) {
                this.setState({ sizeDataList: response });
            };
        });

        fishService.getDataArea().then((response) => {
            if (response) {
                this.setState({ areaDataList: response })
            };
        });
    };

    columns = () => {
        return [
            {
                title: 'Komoditas',
                dataIndex: 'komoditas',
                key: 'komoditas',
            },
            {
                title: 'Harga',
                dataIndex: 'price',
                key: 'price',
                render: text => <>Rp. { helper.numberFormat(text || 0, ',') }</>
            },
            {
                title: 'Ukuran',
                dataIndex: 'size',
                key: 'size'
            },
            {
                title: 'Area Provinsi',
                dataIndex: 'area_provinsi',
                key: 'area_provinsi'
            },
            {
                title: 'Area Kota',
                dataIndex: 'area_kota',
                key: 'area_kota',
            },
            {
                title: 'Tanggal',
                dataIndex: 'tgl_parsed',
                key: 'tgl_parsed',
                render: text => <>{ helper.dateParser(text) ? helper.dateParser(text) : '' }</>
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <Space>
                        <CustomButton
                            type="default"
                            size="default"
                            text="Edit"
                            onClick={ () => {
                                    this.handleEditData(record);
                                    this.handleShowForm(true, "edit");
                                }
                            }
                        />
                        <CustomButton 
                            type="danger"
                            size="default"
                            text="Delete"
                            ghost={ true }
                            onClick={ () => {
                                this.handleDeleteData(record.uuid);
                            }
                        }
                        />
                    </Space>
                ),
            }
        ];
    };

    filteredData = () => {
        const { data } = this.props
        const { searchText } = this.state

        return data.filter(
            item =>
                (item.komoditas && item.komoditas.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.area_kota && item.area_kota.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.area_provinsi && item.area_provinsi.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.price && item.price.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.size && item.size.toLowerCase().includes(searchText.toLowerCase()))
        );
    }

    handleShowForm (value, formType = "add") {
        if (value === false) {
            this.setState({
                uuid: '',
                commodity: '',
                province: '',
                city: '',
                size: '',
                price: ''
            });
        }

        this.setState({
            showForm: value,
            formType: formType
        });
    };

    handleEditData = (data) => {
        this.setState({
            uuid: data.uuid,
            commodity: data.komoditas,
            province: data.area_provinsi,
            city: data.area_kota,
            size: data.size,
            price: data.price
        });
    }

    handleSubmit () {
        const { uuid, commodity, province, city, size, price, formType } = this.state;
        const date = helper.getCurrentYear() + '/' + helper.getCurrentMonth() + '/' + helper.getCurrentDay()

        Swal.fire({
            title: 'Confirmation', 
            text: 'Are you sure want to submit ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5867dd',
            cancelButtonColor: '#ed1c24',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                if (formType === 'add') {
                    this.props.createData({
                        komoditas: commodity,
                        area_provinsi: province,
                        area_kota: city,
                        size: size,
                        price: price,
                        tgl_parsed: date,
                        uuid: 'id' + helper.getCurrentDay() + '' + helper.getCurrentMonth() + '' + helper.getCurrentYear() + '' + Math.random()
                    }).then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "Data berhasil ditambahkan",
                            icon: "success"
                        })
                        .then((res) => {
                            if (res.value) {
                                this.handleShowForm(false);
                            }
                        })
                    })
                } else {
                    this.props.updateData({
                        uuid: uuid,
                        komoditas: commodity,
                        area_provinsi: province,
                        area_kota: city,
                        size: size,
                        price: price,
                        tgl_parsed: date
                    }).then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "Data berhasil diubah",
                            icon: "success"
                        })
                        .then((res) => {
                            if (res.value) {
                                this.handleShowForm(false);
                            }
                        })
                    })
                }
            }
        });
    };

    handleDeleteData(id) {
        Swal.fire({
            title: 'Confirmation', 
            text: 'Are you sure want to submit ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5867dd',
            cancelButtonColor: '#ed1c24',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                this.props.deleteData({uuid: id}).then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "Data berhasil dihapus",
                        icon: "success"
                    })
                    .then((res) => {
                        if (res.value) {
                            this.handleShowForm(false);
                        }
                    })
                })
            }
        });
    }

    formLayout = () => {
        
        return (
            <Modal
                title={ `${ this.state.formType === "add" ? 'Add' : 'Edit' } Data` }
                visible={ this.state.showForm }
                onCancel={ () => this.handleShowForm(false) }
                footer={[
                    <Button key="back" onClick={ () => this.handleShowForm(false) }>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={ this.handleSubmit } ghost>
                        { this.state.formType === "add" ? 'Submit' : 'Save Changes' }
                    </Button>
                ]}
            >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Komoditas</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Komoditas'
                            defaultValue={ this.state.commodity }
                            onChange={ (e) => this.setState({ commodity: e.target.value }) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Harga</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder='Harga'
                            defaultValue={ this.state.price }
                            onChange={ (e) => this.setState({ price: e.target.value }) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ukuran</Form.Label>
                        <Form.Select
                            defaultValue={ this.state.size }
                            onChange={ (e) => this.setState({ size: e.target.value }) }
                        >
                            <option key={ 0 } value={ '' } disabled>- Pilih -</option>
                            {
                                this.state.sizeDataList.map((item, index) => {
                                    return <option key={ index+1 } value={ item.size }>{ item.size }</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Area Provinsi</Form.Label>
                        <Form.Select
                            defaultValue={ this.state.province }
                            onChange={ (e) => this.setState({ province: e.target.value }) }
                        >
                            <option key={ 0 } value={ '' } disabled>- Pilih -</option>
                            {
                                this.state.areaDataList.map((item, index) => {
                                    return <option key={ index+1 } value={ item.province }>{ item.province }</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Area kota</Form.Label>
                        <Form.Select
                            defaultValue={ this.state.city }
                            onChange={ (e) => this.setState({ city: e.target.value }) }
                        >
                            <option key={ 0 } value={ '' } disabled>- Pilih -</option>
                            {
                                this.state.areaDataList.map((item, index) => {
                                    return <option key={ index+1 } value={ item.city }>{ item.city }</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal>
        )
    }

    render () {
        return (
            <>
                <Row justify="end" className='row-margin-bot'>
                    <Col span={ 2 }>
                        <CustomButton type="primary" size="default" text="Add" block={ true } ghost={ true } onClick={ () => this.handleShowForm(true, 'add') }/>
                    </Col>
                </Row>
                <Row justify="end" className='row-margin-bot'>
                    <Col span={ 20 }>
                        <Typography.Title level={2}>Data Komoditas</Typography.Title>
                    </Col>
                    <Col span={ 4 }>
                        <Input
                            onChange={ (e) => this.setState({ searchText: e.target.value }) }
                            placeholder="Search..."
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Table
                            dataSource={ this.filteredData() }
                            columns={ this.columns() }
                            bordered
                            size='small'
                        />
                    </Col>
                </Row>
                { this.formLayout() }
            </>
        )
    }
}

export default TableData;