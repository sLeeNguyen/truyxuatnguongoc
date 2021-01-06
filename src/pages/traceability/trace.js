import {Component} from 'react'

import {Col, Row, Container, Table} from 'react-bootstrap';
import {useParams} from 'react-router-dom'
import '../style.css';
import PageLoading from '../loading/pageloading';
import {API_URL} from '../../config/constants';
import {notifySuccess, notifyError, notifyInfo} from '../notify';
import backImg from '../resources/back.png';

var dateFormat = require("dateformat");
const format = "hh:MM:ss dd/mm/yyyy";

class TraceProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          productAction: null,
        };
    }

    componentDidMount() {
        const {productId} = this.props.match.params
        fetch(`${API_URL}/getproductbyid?product_id=${productId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(
              (result) => {
                // sort result by time
                result.sort(function(item1, item2) {
                    return parseInt(item2.time) - parseInt(item1.time);
                });
                this.setState({productAction: result});
            },
              (error) => {
                  console.log(error);
                notifyError("Xảy ra lỗi", " ");
              }
            );
    }

    render() {
        var {productAction} = this.state;
        if (!productAction) {
            return <PageLoading/>;
        }
        else {
            var product = productAction[0];
            return(
                <Container className="py-3 mt-5">
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <div className="product-box p-3">
                                <div className="text-center mb-4">
                                    <span className="title font-weight-bold pb-2 px-5">Kết quả truy xuất</span>
                                </div>
                                <div className="px-4 py-3 product-info mx-3">
                                    <div className="font-weight-bold product-info-title mb-2">Thông tin sản phẩm</div>
                                    <Row className="py-2">
                                        <Col md={4} className="label">Tên sản phẩm</Col>
                                        <Col md={8}>{product.name}</Col>
                                    </Row>
                                    <Row className="py-2">
                                        <Col md={4} className="label">Mã sản phẩm</Col>
                                        <Col md={8}>{product.product_id}</Col>
                                    </Row>
                                    <Row className="py-2">
                                        
                                    </Row>
                                </div>
                                <div className="product-action mx-3 mt-5">
                                    <h5>Lịch sử chăm sóc</h5>
                                    <div style={{overflow: "auto", maxHeight: "400px"}}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th className="minw-100">Hoạt động</th>
                                                    <th className="minw-100">Thời gian</th>
                                                    <th className="minw-100">Mã hoạt động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {productAction.map((item, index) => {
                                                if (!item.action) return;
                                                return(
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.action}</td>
                                                        <td>{dateFormat(parseInt(item.time), format)}</td>
                                                        <td title={`Mã hoạt động: ${item.txid}`}>{item.txid.substring(0,30) + "..."}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div class="back"><img src={backImg}/></div>
                </Container>
            );
        }
    }
}

export default TraceProduct;