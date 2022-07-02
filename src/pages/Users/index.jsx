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
import styles from './Users.module.scss';
// import { users } from '~/DummyData';
import * as userService from '~/services/userService';

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
                        alt="avatar"
                    />
                    <p className={cx('username')}>{params.row.username}</p>
                </div>
            ),
        },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'role',
            headerName: 'Quyền',
            width: 100,
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 100,
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
                        to={`/users/edit/${params.row.id}`}
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
            const res = await userService.deleteUser(id);
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
            text: 'Bạn có chắc là muốn xóa tài khoản này?',
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

    // Call API getAllUsers
    useEffect(() => {
        const fetchAPI = async () => {
            const users = await userService.getUsers();
            setData(users);
        };
        fetchAPI();
    }, []);

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
            <ToastContainer />
        </div>
    );
}
