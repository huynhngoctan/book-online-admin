import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export default function Button({
    to,
    href,
    primary = false,
    disabled = false,
    edited = false,
    danger = false,
    cancel = false,
    medium = false,
    onClick,
    children,
    leftIcon,
    rightIcon,
    className,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        ...passProps,
        onClick,
    };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof key === 'function') {
                delete props[key];
            }
        });
    }

    if (href) {
        Comp = 'a';
        props.href = href;
    } else if (to) {
        Comp = Link;
        props.to = to;
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        edited,
        danger,
        cancel,
        medium,
        disabled,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}
