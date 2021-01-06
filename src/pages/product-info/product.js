import {Component} from 'react';
import {Col, Row, Container, Button} from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

import '../style.css';

import {API_URL} from '../../config/constants';
import {notifySuccess, notifyError, notifyInfo} from '../notify';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
          product: null
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/getproductbyid?product_id=f1e349f5-96a4-4d19-baef-de5e5ebddb2d`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({product: result[0]});
            },
              (error) => {
                  console.log(error);
                notifyError("Xảy ra lỗi", " ");
              }
            );
    }

    onWatering() {
        const action = "Tưới nước";
        this.updateProduct(action);
    }

    onManure() {
        const action = "Bón phân";
        this.updateProduct(action);
    }

    onSpray() {
        const action = "Phun thuốc sâu";
        this.updateProduct(action);
    }

    async updateProduct(action) {
        var {product} = this.state

        fetch(`${API_URL}/updateproduct`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                product_id: product.product_id,
                name: product.name,
                action: action,
                time: String(Date.now())
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    notifySuccess("Thực hiện thành công", " ");
                },
                (error) => {
                    notifyError("Xảy ra lỗi", error);
                }
            )
        }

    render() {
        var {product} = this.state;
        if (!product) {
            return <div>loading...</div>
        }
        else {
            return(
                <Container className="py-3 mt-5">
                    <Row>
                        <Col md={8}>
                            <div className="product-box p-3">
                                <div className="text-center mb-4">
                                    <span className="product-title font-weight-bold pb-2 px-5">Thông tin sản phẩm</span>
                                </div>
                                <div className="px-4 py-2">
                                    <Row className="py-2">
                                        <Col md={5} className="label">Tên sản phẩm</Col>
                                        <Col md={7}>{product.name}</Col>
                                    </Row>
                                    <Row className="py-2">
                                        <Col md={5} className="label">Mã sản phẩm</Col>
                                        <Col md={7}>{product.product_id}</Col>
                                    </Row>
                                    <Row className="py-2">
                                        <Col md={5} className="label">Thông tin khởi tạo sản phẩm</Col>
                                        <Col md={7}>{product.txid.substring(0,30) + "..."}</Col>
                                    </Row>
                                    <div className="d-flex justify-content-center">
                                        <div className="qrcode pt-4">
                                            <Link to={`/traceproduct/${product.product_id}`}><img src="https://miro.medium.com/max/1424/1*sHmqYIYMV_C3TUhucHrT4w.png"/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="product-box h-100">
                                <div className="button-list">
                                    <Button variant="outline-success font-weight-bold" onClick={this.onWatering.bind(this)}>Tưới nước</Button>
                                    <Button variant="outline-success font-weight-bold" onClick={this.onManure.bind(this)}>Bón phân</Button>
                                    <Button variant="outline-success font-weight-bold" onClick={this.onSpray.bind(this)}>Phun thuốc sâu</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }
        
    }
}

export default Product;