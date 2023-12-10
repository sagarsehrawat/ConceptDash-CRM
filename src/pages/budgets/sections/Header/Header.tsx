import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

type Props = {
    city: City;
    setCityId: Function;
}

const Header = ({ city, setCityId } : Props) => {
    return (
        <div className='d-flex flex-row justify-content-start align-items-center' style={{ margin: '32px 24px 0px 32px' }}>
            <FontAwesomeIcon
                icon={faArrowLeft}
                color="#70757A"
                style={{ marginRight: "16px", cursor: "pointer" }}
                onClick={() => {
                    setCityId(null);
                }}
            />
            <p className='heading-2'>{city.city}</p>
        </div>
    )
}

export default Header