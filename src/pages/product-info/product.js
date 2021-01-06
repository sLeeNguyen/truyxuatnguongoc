import {Component} from 'react';
import {Col, Row, Container, Button, Spinner} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PageLoading from '../loading/pageloading';
import '../style.css';

import {API_URL} from '../../config/constants';
import {notifySuccess, notifyError} from '../notify';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
          product: null,
          loading: true,
          loading1: false,
          loading2: false,
          loading3: false
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
        this.setState({loading1: true});
        const action = "Tưới nước";
        this.updateProduct(action).then(() => {
            this.setState({loading1: false});
        });
    }

    onManure() {
        this.setState({loading2: true});
        const action = "Bón phân";
        this.updateProduct(action).then(() => {
            this.setState({loading2: false});
        });
    }

    onSpray() {
        this.setState({loading3: true});
        const action = "Phun thuốc sâu";
        this.updateProduct(action).then(() => {
            this.setState({loading3: false});
        });
    }

    async updateProduct(action, loading) {
        var {product} = this.state

        return fetch(`${API_URL}/updateproduct`, {
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
        var {product, loading1, loading2, loading3} = this.state;
        if (!product) {
            return <PageLoading/>
        }
        else {
            return(
                <Container className="py-3 mt-5">
                    <Row>
                        <Col md={8}>
                            <div className="product-box p-3">
                                <div className="text-center mb-4">
                                    <span className="title font-weight-bold pb-2 px-5">Thông tin sản phẩm</span>
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
                                        <Col md={7} title={`${product.txid}`}>{product.txid.substring(0,25) + "..."}</Col>
                                    </Row>
                                    <div className="d-flex justify-content-center">
                                        <div className="qrcode pt-4">
                                            <Link to={`/traceproduct/${product.product_id}`}><img src="./qrcode.png"/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="product-box h-100">
                                <h5 className="text-center py-2">Thực hiện hành động</h5>
                                <div className="button-list">
                                    <Button variant="outline-success font-weight-bold" onClick={this.onWatering.bind(this)} disabled={loading1}>
                                        <Spinner animation="border" className="mr-2" hidden={!loading1}/>
                                        Tưới nước
                                    </Button>
                                    <Button variant="outline-success font-weight-bold" onClick={this.onManure.bind(this)} disabled={loading2}>
                                        <Spinner animation="border" className="mr-2" hidden={!loading2}/>
                                        Bón phân
                                    </Button>
                                    <Button variant="outline-success font-weight-bold" onClick={this.onSpray.bind(this)} disabled={loading3}>
                                        <Spinner animation="border" className="mr-2" hidden={!loading3}/>
                                        Phun thuốc sâu
                                    </Button>
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