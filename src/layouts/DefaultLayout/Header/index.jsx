import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);
export default function Header() {
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
                            src="https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo"
                            alt="avatar"
                        />
                        <span className={cx('username')}> Tan Huynh</span>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}
