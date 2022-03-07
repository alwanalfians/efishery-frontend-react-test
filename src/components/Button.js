import { Button } from 'antd';
import 'antd/dist/antd.css';

const CustomButton = (props) => {
    const { key, onClick, text, size, type, block , danger, ghost } = props

    return (
        <Button
            key={ key }
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