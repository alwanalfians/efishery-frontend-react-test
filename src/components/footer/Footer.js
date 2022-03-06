import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './Footer.scss';

const Footer = (props) => {

    return (
        <Layout.Footer style={{ textAlign: 'center' }}>
            Made by <a href="https://www.linkedin.com/in/alwanalfians" className='link' target="_blank">Me</a> with ❤
        </Layout.Footer>
    );
}

export default Footer;