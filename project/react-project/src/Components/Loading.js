import Spinner from 'react-bootstrap/Spinner';

export default function LoadingScreen() {
    return <Spinner animation="grow"
        className='position-absolute top-50 start-50 translate-middle' />;

}