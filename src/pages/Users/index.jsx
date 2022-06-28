import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './Users.module.scss';
import { users } from '~/DummyData';

const cx = classNames.bind(styles);

export default function Users() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'user',
            headerName: 'Tên đăng nhập',
            width: 200,
            renderCell: (params) => (
                <div className={cx('user')}>
                    <Image
                        className={cx('avatar')}
                        src={params.row.avatar}
                        alt="avartar"
                    />
                    <p className={cx('username')}>{params.row.username}</p>
                </div>
            ),
        },
        { field: 'email', headerName: 'Email', width: 250 },
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
                        to={`/users/edit${params.row.id}`}
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

    const [data, setData] = useState(users);
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
                <Button primary to="/users/new">
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
