import { Button } from 'antd';
import 'antd/dist/antd.css';

const CustomButton = (props) => {
    const { onClick, text, size, type } = props

    return (
        <Button type={ type || "primary" } size={ size || "default" } onClick={ onClick }>
            { text }
        </Button>
    )
}

export default CustomButton