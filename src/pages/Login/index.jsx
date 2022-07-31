import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Login.module.scss';
import * as userService from '~/services/userService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Login() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleValidate = () => {
        setIsSubmit(true);
        setFormError(validate);
    };

    const validate = () => {
        const errors = {};
        // eslint-disable-next-line no-useless-escape
        if (user.username.length <= 0) {
            errors.username = 'Vui lòng nhập tên đăng nhập';
        }
        if (user.password.length <= 0) {
            errors.password = 'Vui lòng nhập mật khẩu';
        }
        return errors;
    };

    // Call API
    useEffect(() => {
        if (isSubmit && Object.keys(formError).length === 0) {
            const fetchAPI = async () => {
                const res = await userService.login(
                    user.username,
                    user.password,
                );
                if (res.message === 'Wrong')
                    setMessage('Sai tên đăng nhập hoặc mật khẩu');
                if (res.message === 'Role')
                    setMessage('Tài khoản không có quyền admin');
                if (res.message === 'Status')
                    setMessage('Tài khoản đã bị khóa');
                if (res.status === 'success') {
                    const userLocal = res.data;
                    localStorage.setItem('user', JSON.stringify(userLocal));
                    navigate('/');
                }
            };
            fetchAPI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-content')}>
                <h3 className={cx('login-title')}>Đăng nhập</h3>
                {message && <span className={cx('form-error')}>{message}</span>}
                <form className={cx('login-form')}>
                    <div className={cx('form-group')}>
                        <label className={cx('form-title')} htmlFor="username">
                            Tên đăng nhập
                        </label>
                        <input
                            className={cx('form-control', {
                                error: !!formError.username,
                            })}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Nhập tên đăng nhập"
                            value={user.username}
                            onChange={handleOnChange}
                        />
                        {formError.username && (
                            <span className={cx('form-error')}>
                                {formError.username}
                            </span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-title')} htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
                            className={cx('form-control', {
                                error: !!formError.password,
                            })}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={user.password}
                            onChange={handleOnChange}
                        />
                        {formError.password && (
                            <span className={cx('form-error')}>
                                {formError.password}
                            </span>
                        )}
                    </div>
                    <button
                        className={cx('btn-submit')}
                        type="button"
                        onClick={handleValidate}
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}
