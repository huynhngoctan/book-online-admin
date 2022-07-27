import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { orderDetails } from '~/DummyData';
import classNames from 'classnames/bind';
import { toast, ToastContainer } from 'react-toastify';

import styles from './EditOrder.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import * as orderService from '~/services/orderService';
import { useParams } from 'react-router-dom';
import * as CurrencyFormat from '~/utils/CurrencyFormat';

const cx = classNames.bind(styles);
export default function EditOrder() {
    let { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    const [order, setOrder] = useState({});
    const columns = [
        {
            field: 'productImage',
            headerName: 'Ảnh sản phẩm',
            width: 150,
            renderCell: (params) => (
                <div className={cx('product')}>
                    <Image
                        className={cx('product-image')}
                        src={params.row.product.linkImage}
                        alt="product"
                    />
                </div>
            ),
        },
        {
            field: 'product',
            headerName: 'Tên sản phẩm',
            width: 300,
            renderCell: (params) => (
                <div className={cx('product-info')}>
                    <p className={cx('product-name')}>
                        {params.row.product.name}
                    </p>
                    <p className={cx('product-author')}>
                        {params.row.product.author}
                    </p>
                </div>
            ),
        },
        { field: 'quantity', headerName: 'Số lượng', width: 150 },
        {
            field: 'price',
            headerName: 'Đơn giá',
            width: 150,
            renderCell: (params) => (
                <div className={cx('product-info')}>
                    <p>{CurrencyFormat.format(params.row.product.price)}đ</p>
                </div>
            ),
        },
        {
            field: 'orderDetailPrice',
            headerName: 'Thành tiền',
            width: 250,
            renderCell: (params) => (
                <div className={cx('product-info')}>
                    <p>{CurrencyFormat.format(params.row.orderDetailPrice)}đ</p>
                </div>
            ),
        },
    ];

    const handleOnChange = (name, value) => {
        setOrder({
            ...order,
            [name]: value,
        });
    };

    // Call API get order
    useEffect(() => {
        const fetchAPI = async () => {
            const order = await orderService.getOrder(orderId);
            setOrder(order);
            console.log(order);
            setOrderDetail(order.orderDetailList);
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle update order
    const handleUpdateOrder = () => {
        const fetchAPI = async () => {
            const orderDTO = {
                paymentStatus: order.paymentStatus,
                status: order.status,
            };
            const res = await orderService.updateOrder(orderId, orderDTO);
            res.status === 'success'
                ? toast.success('Cập nhật thành công', {
                      autoClose: 3000,
                      position: 'top-right',
                  })
                : toast.error('Cập nhật thất bại', {
                      autoClose: 3000,
                      position: 'top-right',
                  });
        };
        fetchAPI();
    };
    return (
        <div className={cx('wrapper')}>
            <h3>Chi tiết sản phẩm</h3>
            <DataGrid
                className={cx('produtct-detail-table')}
                rows={orderDetail}
                columns={columns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                disableSelectionOnClick
            />
            <div className={cx('product-detail-wrapper')}>
                <div className={cx('product-detail-right')}>
                    <table className={cx('table')}>
                        <tbody>
                            <tr>
                                <td className={cx('table-title')}>
                                    Khách hàng
                                </td>
                                <td className={cx('table-content')}>
                                    {order.customer}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Địa chỉ lấy hàng
                                </td>
                                <td className={cx('table-content')}>
                                    {order.address}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Số điện thoại
                                </td>
                                <td className={cx('table-content')}>
                                    {order.phone}
                                </td>
                            </tr>

                            <tr>
                                <td className={cx('table-title')}>Ngày tạo</td>
                                <td className={cx('table-content')}>
                                    {order.createdDate}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Trạng thái thanh toán
                                </td>
                                <td className={cx('table-content')}>
                                    <select
                                        id="paymentStatus"
                                        className={cx('form-control')}
                                        name="paymentStatus"
                                        value={order.paymentStatus}
                                        onChange={(e) =>
                                            handleOnChange(
                                                e.target.name,
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="Chưa thanh toán">
                                            Chưa thanh toán
                                        </option>
                                        <option value="Đã thanh toán">
                                            Đã thanh toán
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Trạng thái đơn hàng
                                </td>
                                <td className={cx('table-content')}>
                                    <select
                                        id="status"
                                        className={cx('form-control')}
                                        name="status"
                                        value={order.status}
                                        onChange={(e) =>
                                            handleOnChange(
                                                e.target.name,
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="Đơn hàng mới">
                                            Đơn hàng mới
                                        </option>
                                        <option value="Đang giao hàng">
                                            Đang giao hàng
                                        </option>
                                        <option value="Hoàn thành">
                                            Hoàn thành
                                        </option>
                                        <option value="Hủy">Hủy</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={cx('product-detail-right')}>
                    <table className={cx('table')}>
                        <tbody>
                            <tr>
                                <td className={cx('table-title')}>
                                    Tổng tiền hàng
                                </td>
                                <td className={cx('table-content')}>
                                    {CurrencyFormat.format(
                                        order.totalPriceOrderDetail,
                                    )}
                                    đ
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Phí vận chuyển
                                </td>
                                <td className={cx('table-content')}>
                                    {CurrencyFormat.format(order.shipPrice)}đ
                                </td>
                            </tr>
                            {/* <tr>
                                <td className={cx('table-title')}>VAT(0%)</td>
                                <td className={cx('table-content')}>0</td>
                            </tr> */}
                            <tr>
                                <td className={cx('table-title', 'bold')}>
                                    Tổng giá trị đơn hàng
                                </td>
                                <td className={cx('table-content', 'bold')}>
                                    {CurrencyFormat.format(order.totalPrice)}đ
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={cx('actions')}>
                        <Button
                            edited
                            medium
                            type="button"
                            onClick={handleUpdateOrder}
                        >
                            Cập nhật
                        </Button>
                        <Button cancel medium to="/orders" type="button">
                            Hủy
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
