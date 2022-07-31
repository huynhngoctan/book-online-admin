import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Search from '~/layouts/components/Search';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function Header() {
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <span>Admin</span>
                </div>
                {/* Search */}
                <Search />
                <Tippy
                    render={(attrs) => (
                        <div
                            className={cx('account-action')}
                            tabIndex="-1"
                            {...attrs}
                        >
                            <PopperWrapper>
                                <ul className={cx('list-action')}>
                                    <li>
                                        <a
                                            className={cx('action-link')}
                                            href="/"
                                        >
                                            Thông tin cá nhân
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className={cx('action-link')}
                                            href="/"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </PopperWrapper>
                        </div>
                    )}
                    interactive
                >
                    <div className={cx('account')}>
                        <img
                            className={cx('avatar')}
                            src={user.avatar}
                            alt="avatar"
                        />
                        <span className={cx('username')}>{user.username}</span>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}
