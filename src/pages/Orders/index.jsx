import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

import Button from '~/components/Button';
import styles from './Orders.module.scss';
// import { orders } from '~/DummyData';
import * as orderService from '~/services/orderService';
import * as CurrencyFormat from '~/utils/CurrencyFormat';

const cx = classNames.bind(styles);

export default function Orders() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'customer',
            headerName: 'Khách hàng',
            width: 150,
        },
        { field: 'status', headerName: 'Trạng thái', width: 150 },
        {
            field: 'paymentStatus',
            headerName: 'Thanh toán',
            width: 150,
        },
        {
            field: 'createdDate',
            headerName: 'Ngày tạo',
            width: 150,
        },
        {
            field: 'totalPrice',
            headerName: 'Tổng tiền',
            width: 150,
            renderCell: (params) => (
                <div>
                    <p>{CurrencyFormat.format(params.row.totalPrice)}đ</p>
                </div>
            ),
        },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        edited
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        to={`/orders/edit/${params.row.id}`}
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Xóa
                    </Button>
                </>
            ),
        },
    ];

    const [data, setData] = useState([]);
    const handleDelete = (id) => {
        const fetchAPI = async () => {
            const res = await orderService.deleteOrder(id);
            res.status === 'success'
                ? toast.success('Xóa thành công', {
                      autoClose: 3000,
                      position: 'top-right',
                  })
                : toast.error('Xóa thất bại', {
                      autoClose: 3000,
                      position: 'top-right',
                  });
        };
        Swal.fire({
            title: 'Thông báo',
            text: 'Bạn có chắc là muốn xóa đơn hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                setData(
                    data.filter((item) => {
                        return item.id !== id;
                    }),
                );
                fetchAPI();
            }
        });
    };

    // Call API get all order
    useEffect(() => {
        const fetchAPI = async () => {
            const orders = await orderService.getOrders();
            setData(orders);
        };
        fetchAPI();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <DataGrid
                className={cx('table')}
                rows={data}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
            <ToastContainer />
        </div>
    );
}
