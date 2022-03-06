import { PageHeader } from 'antd';
import 'antd/dist/antd.css';
import './Header.scss';
import Logo from '../../assets/img/eFishery-logo.png';

const Header = (props) => {

    const { title, subTitle } = props;

    return (
        <PageHeader
          className="site-page-header"
          title={ title }
          subTitle={ subTitle }
          avatar={{ src: Logo }}
        />
    );
}

export default Header;