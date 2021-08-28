import React, { useEffect, useState } from 'react';
import HttpUtil from '../../services/http-util';

const IdentifierList = ({onChange}) => {

    const [data, setData] = useState(null);
    const [list, setList] = useState(null);



    useEffect(() => {
        HttpUtil.getIdentifierData().then(data => {
            setList(data);
        })
    }, [])

    return (
        <select onChange={onChange}>
            {list && list.map(x => <option value={x}>{x}</option>)}
        </select>
    )
}

export default IdentifierList;