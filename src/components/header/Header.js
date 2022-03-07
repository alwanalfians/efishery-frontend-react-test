import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './Header.scss';
import Logo from '../../assets/img/eFishery-logo-with-text-white.png';

const Header = () => {
    return (
        <Layout.Header className="site-page-header">
            <div className="logo">
                <img src={ Logo } height="32px"/>
            </div>
        </Layout.Header>
    );
}

export default Header;