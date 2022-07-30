import React from 'react'

const Error = ({touched, errors}) => {
    const style = {
        color:'red',
        fontSize: '12px'
      };
    if(touched && errors) {
        return (
            <div style={style}>
                <p>{errors}</p>
            </div>
        )
    }
}

export default Error