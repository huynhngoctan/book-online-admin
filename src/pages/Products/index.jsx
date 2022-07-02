import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './Products.module.scss';
import { products } from '~/DummyData';

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
                        src={params.row.image}
                        alt="product"
                    />
                    <p className={cx('name')}>{params.row.name}</p>
                </div>
            ),
        },
        { field: 'stock', headerName: 'Số lượng', width: 250 },
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

    const [data, setData] = useState(products);
    const handleDelete = (id) => {
        setData(
            data.filter((item) => {
                return item.id !== id;
            }),
        );
    };
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
        </div>
    );
}
