import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import styles from './Users.module.scss';

const cx = classNames.bind(styles);

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'user',
        headerName: 'Tên đăng nhập',
        width: 200,
        renderCell: (params) => (
            <div className={cx('user')}>
                <img
                    className={cx('avatar')}
                    src={params.row.avatar}
                    alt="avartar"
                />
                <p className={cx('usermame')}>{params.row.usermame}</p>
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
        width: 160,
    },
];

const rows = [
    {
        id: 1,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 2,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 3,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 4,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 5,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 6,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 7,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 8,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 9,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 10,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 11,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
    {
        id: 12,
        usermame: 'Tan Huynh',
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        email: 'hntan2000@gmail.com',
        status: 'Đang sử dụng',
    },
];

export default function Users() {
    return (
        <div className={cx('wrapper')}>
            <DataGrid
                className={cx('table')}
                rows={rows}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
        </div>
    );
}
