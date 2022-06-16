import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Button
                primary
                to="https://www.google.com/"
                leftIcon={<FontAwesomeIcon icon={faHome} />}
            >
                Hello
            </Button>
            <Button danger to="https://www.google.com/">
                Hello
            </Button>
        </div>
    );
}
