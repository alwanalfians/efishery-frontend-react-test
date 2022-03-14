import { Table, Space, Row, Col, Input, Modal, Typography } from 'antd';
import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import * as helper from '../../lib/helper';
import * as fishService from '../../services/fish';
import CustomButton from '../Button';
import './TableData.scss';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


class TableData extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
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
            provinceDataList: [],
            cityDataList: []
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
                const distinctDataArea = [... new Map(response.map(item => [item['province'], item])).values()];

                this.setState({ provinceDataList: distinctDataArea });
                this.setState({ areaDataList: response });
            };
        });
    };

    columns = () => {
        return [
            {
                title: 'Komoditas',
                dataIndex: 'komoditas',
                key: 'komoditas',
                sorter: (a, b) => {
                    if (a.komoditas.toLowerCase() > b.komoditas.toLowerCase())
                        return -1;
                    if (a.komoditas.toLowerCase() < b.komoditas.toLowerCase())
                        return 1;
                    return 0;
                },
            },
            {
                title: 'Harga',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                render: text => <>Rp. { helper.numberFormat(text || 0, ',') }</>
            },
            {
                title: 'Ukuran',
                dataIndex: 'size',
                key: 'size',
                sorter: (a, b) => a.size - b.size,
            },
            {
                title: 'Area Provinsi',
                dataIndex: 'area_provinsi',
                key: 'area_provinsi',
                sorter: (a, b) => {
                    if (a.area_provinsi.toLowerCase() > b.area_provinsi.toLowerCase())
                        return -1;
                    if (a.area_provinsi.toLowerCase() < b.area_provinsi.toLowerCase())
                        return 1;
                    return 0;
                },
            },
            {
                title: 'Area Kota',
                dataIndex: 'area_kota',
                key: 'area_kota',
                sorter: (a, b) => {
                    if (a.area_kota.toLowerCase() > b.area_kota.toLowerCase())
                        return -1;
                    if (a.area_kota.toLowerCase() < b.area_kota.toLowerCase())
                        return 1;
                    return 0;
                },
            },
            {
                title: 'Tanggal',
                dataIndex: 'tgl_parsed',
                key: 'tgl_parsed',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.tgl_parsed) - new Date(b.tgl_parsed),
                render: text => <>{ helper.dateParser(text) ? helper.dateParser(text) : '' }</>
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <Space>
                        <CustomButton
                            icon={<EditOutlined/>}
                            type="primary"
                            size="default"
                            text="Edit"
                            onClick={ () => {
                                    this.handleEditData(record);
                                    this.handleShowForm(true, "edit");
                                }
                            }
                        />
                        <CustomButton
                            icon={<DeleteOutlined/>} 
                            type="danger"
                            size="default"
                            text="Delete"
                            // ghost={ true }
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

    filteredDataKota = (valueProvince) => {

        const filteredData = this.state.areaDataList.filter(item => (item.province === valueProvince))

        this.setState({ province: valueProvince})

        if (filteredData.length > 0) {
            this.setState({ cityDataList: filteredData })
            this.setState({ city: filteredData[0].city })
        }
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

        this.filteredDataKota(data.area_provinsi);

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
                    this.setState({ loading: true })
                    this.props.createData({
                        komoditas: commodity,
                        area_provinsi: province,
                        area_kota: city,
                        size: size,
                        price: price,
                        tgl_parsed: date + ' ' + helper.getCurrentTime(),
                        uuid: v4()
                    }).then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "Data berhasil ditambahkan",
                            icon: "success"
                        })
                        .then((res) => {
                            if (res.value) {
                                this.setState({ loading: false })
                                this.handleShowForm(false);
                            }
                        })
                    })
                } else {
                    this.setState({ loading: true })
                    this.props.updateData({
                        uuid: uuid,
                        komoditas: commodity,
                        area_provinsi: province,
                        area_kota: city,
                        size: size,
                        price: price,
                        tgl_parsed: date + ' ' + helper.getCurrentTime()
                    }).then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "Data berhasil diubah",
                            icon: "success"
                        })
                        .then((res) => {
                            if (res.value) {
                                this.setState({ loading: false })
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
                Swal.fire({
                    title: 'Please Wait..',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
                this.props.deleteData({uuid: id}).then(() => {
                    Swal.close();
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
                    <CustomButton
                        key="back"
                        onClick={ () => this.handleShowForm(false) }
                        text="Cancel"
                    />,
                    <CustomButton
                        key="submit"
                        type="success"
                        onClick={ this.handleSubmit }
                        loading={ this.state.loading }
                        text={ this.state.formType === "add" ? 'Submit' : 'Save Changes' }
                    />
                ]}
            >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Komoditas</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Komoditas'
                            value={ this.state.commodity }
                            onChange={ (e) => this.setState({ commodity: e.target.value }) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Harga</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder='Harga'
                            value={ this.state.price }
                            onChange={ (e) => this.setState({ price: e.target.value }) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ukuran</Form.Label>
                        <Form.Select
                            value={ this.state.size }
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
                            value={ this.state.province }
                            onChange={ (e) => this.filteredDataKota(e.target.value) }
                        >
                            <option key={ 0 } value={ '' } disabled>- Pilih -</option>
                            {
                                this.state.provinceDataList.map((item, index) => {
                                    return <option key={ index+1 } value={ item.province }>{ item.province }</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Area kota</Form.Label>
                        <Form.Select
                            value={ this.state.city }
                            onChange={ (e) => this.setState({ city: e.target.value }) }
                        >
                            <option key={ 0 } value={ '' } disabled>- Pilih -</option>
                            {
                                this.state.cityDataList.map((item, index) => {
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
                    <Col span={ 22 }>
                        <Typography.Title level={2}>Data Komoditas Ikan</Typography.Title>
                    </Col>
                    <Col span={ 2 }>
                        <CustomButton
                            icon={<PlusOutlined/>}
                            type="success"
                            size="default"
                            text="Add"
                            block={ true }
                            onClick={ () => this.handleShowForm(true, 'add') }
                        />
                    </Col>
                </Row>
                <Row justify="end" className='row-margin-bot'>
                    <Col span={ 4 }>
                        <Input
                            prefix={<SearchOutlined/>}
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