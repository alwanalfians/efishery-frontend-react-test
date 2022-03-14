import Button from "antd-button-color";
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import './Button.scss';

const CustomButton = (props) => {
    const { icon, key, onClick, text, loading, size, type, block , danger, ghost } = props

    return (
        <Button
            icon={ icon }
            key={ key }
            loading={ loading }
            type={ type || "primary" }
            size={ size || "default" }
            onClick={ onClick }
            block={ block }
            danger={ danger }
            ghost={ ghost }
        >
            { text }
        </Button>
    )
}

export default CustomButton