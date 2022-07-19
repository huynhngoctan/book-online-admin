import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './Products.module.scss';
// import { products } from '~/DummyData';
import * as productService from '~/services/productService';

const cx = classNames.bind(styles);

export default function Products() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'product',
            headerName: 'Tên sản phẩm',
            width: 200,
            renderCell: (params) => (
                <div className={cx('product')}>
                    <Image
                        className={cx('product-image')}
                        src={params.row.linkImage}
                        alt="product"
                    />
                    <p className={cx('name')}>{params.row.name}</p>
                </div>
            ),
        },
        { field: 'author', headerName: 'Tác giả', width: 200 },
        { field: 'stock', headerName: 'Số lượng', width: 150 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 250,
            renderCell: (params) => (
                <>
                    <Button
                        edited
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        to={`/products/edit/${params.row.id}`}
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
            const res = await productService.deleteProduct(id);
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
            text: 'Bạn có chắc là muốn xóa sản phẩm này?',
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

    //Call API get all products
    useEffect(() => {
        const fetchAPI = async () => {
            const products = await productService.getProducts();
            setData(products);
        };
        fetchAPI();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                <Button primary to="/products/new">
                    Thêm
                </Button>
            </div>
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
