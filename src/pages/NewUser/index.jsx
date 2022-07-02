import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import images from '~/assets/images';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '~/components/Button';
import styles from './NewUser.module.scss';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);
export default function NewUser() {
    const [avatar, setAvatar] = useState();
    const initialState = {
        avatar: '',
        username: '',
        password: '',
        fullname: '',
        birthday: '',
        email: '',
        phone: '',
        address: '',
        role: 'user',
        status: 'Kích hoạt',
    };

    const [user, setUser] = useState(initialState);
    const [username, setUsername] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isUsername, setIsUsername] = useState(false);
    const [formError, setFormError] = useState({});

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const handleOnChange = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleValidate = () => {
        setFormError(validate);
        setIsSubmit(true);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    const validate = () => {
        const errors = {};
        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPhone = /^[0-9]*$/;
        if (user.email.length <= 0) {
            errors.email = 'Vui lòng nhập email';
        } else if (!regexEmail.test(user.email)) {
            errors.email = 'Vui lòng nhập đúng định dạng email';
        }

        if (user.phone.trim().length !== 10 && user.phone.trim().length !== 0) {
            errors.phone = 'Vui lòng nhập đúng 10 kí tự';
        } else if (!regexPhone.test(user.phone.trim())) {
            errors.phone = 'Vui lòng nhập đúng định dạng số điện thoại';
        }

        if (user.username.trim().length <= 0) {
            errors.username = 'Vui lòng nhập tên đăng nhập';
        } else if (isUsername) {
            errors.username = 'Tên dăng nhập đã tồn tại';
        }
        if (user.password.trim().length < 8) {
            errors.password = 'Mật khẩu phải có ít nhất 8 kí tự';
        }
        return errors;
    };

    // Clear Preview avatar url
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);
    // Call API to check username
    useEffect(() => {
        if (username) {
            const fetchAPI = async () => {
                const res = await userService.checkUsername(username);
                // console.log(res);
                if (res.status === 'success') {
                    setIsUsername(true);
                } else {
                    setIsUsername(false);
                }
            };
            fetchAPI();
        }
    }, [username]);

    useEffect(() => {
        // Object.keys(formError).length === 0 &&
        if (Object.keys(formError).length === 0 && isSubmit) {
            // Call API
            const fetchAPI = async () => {
                if (avatar) {
                    const resUpload = await userService.uploadAvatar(avatar);
                    user.avatar = `http://localhost:8080/api/v1/FileUpload/files/${resUpload}`;
                }
                const res = await userService.createUser(user);
                res.status === 'success'
                    ? toast.success('Thêm thành công', {
                          autoClose: 3000,
                          position: 'top-right',
                      })
                    : toast.error('Thêm thất bại', {
                          autoClose: 3000,
                          position: 'top-right',
                      });
                // console.log(res.data);
            };
            fetchAPI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError]);
    return (
        <div className={cx('wrapper')}>
            <h3>Thêm tài khoản</h3>
            <form className={cx('form')}>
                <div className={cx('avatar-wrapper')}>
                    <img
                        className={cx('avatar')}
                        src={avatar ? avatar.preview : images.noImage}
                        alt="avatar"
                    />
                    <label htmlFor="avatar">
                        <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                    </label>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={handlePreviewImage}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="username">
                        Tên đăng nhập (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.username,
                        })}
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={(e) => {
                            handleOnChange(e.target.name, e.target.value);
                            setUsername(e.target.value);
                        }}
                    />
                    {formError.username && (
                        <span className={cx('form-error')}>
                            {formError.username}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="password">
                        Mật khẩu (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.password,
                        })}
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.password && (
                        <span className={cx('form-error')}>
                            {formError.password}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="email">
                        Email (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.email,
                        })}
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.email && (
                        <span className={cx('form-error')}>
                            {formError.email}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="fullname">
                        Họ và tên
                    </label>
                    <input
                        className={cx('form-control')}
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={user.fullname}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="birthday">
                        Ngày sinh
                    </label>
                    <input
                        className={cx('form-control')}
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={user.birthday}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="phone">
                        Số điện thoại
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.phone,
                        })}
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.phone && (
                        <span className={cx('form-error')}>
                            {formError.phone}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="address">
                        Địa chỉ
                    </label>
                    <input
                        className={cx('form-control')}
                        type="text"
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="role">
                        Quyền
                    </label>
                    <select
                        id="role"
                        className={cx('form-control')}
                        name="role"
                        value={user.role}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="status">
                        Trạng thái
                    </label>
                    <select
                        id="status"
                        name="status"
                        className={cx('form-control')}
                        value={user.status}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="Kích hoạt">Kích hoạt</option>
                        <option value="Khóa">Khóa</option>
                    </select>
                </div>
                <div className={cx('actions')}>
                    <Button
                        edited
                        medium
                        type="button"
                        onClick={handleValidate}
                    >
                        Thêm
                    </Button>
                    <Button cancel medium to="/users" type="button">
                        Hủy
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
