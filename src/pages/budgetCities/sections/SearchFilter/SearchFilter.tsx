import React from 'react'
import TFSearchBar from '../../../../components/ui/TFSearchBar/TFSearchBar'

type Props = {
    value: string,
    setValue: Function
}

const SearchFilter = ({value, setValue}: Props) => {
    return (
        <div className='d-flex flex-row justify-content-between' style={{ marginTop: "8px", marginBottom: "24px", marginLeft: "32px", marginRight: '32px' }}>
            <TFSearchBar
                placeholder={'Cities'}
                searchFunc={[value, setValue]} />
        </div>
    )
}

export default SearchFilter