import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import './Pagination.css'

type Props = {
  pages: number,
  currPage: number,
  setcurrPage: Function
}

const Pagination = ({ pages, currPage, setcurrPage }: Props) => {
  return (
    <>
      <div className='d-flex flex-row justify-content-end' style={{ marginTop: "20px", marginRight: "24px", marginBottom: "20px", gap: "8px" }}>
        <Button
          className='page-container'
          disabled={currPage === 1}
          onClick={(e) => setcurrPage(currPage - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="#70757A" />
        </Button>
        <Button
          className={currPage === 1 ? 'current-page-container' : 'page-container'}
          disabled={currPage === 1}
          onClick={(e) => setcurrPage(1)}
        >
          1
        </Button>
        {pages >= 2
          ? <Button
          className={currPage === 2 ? 'current-page-container' : 'page-container'}
            disabled={currPage === 2}
            onClick={(e) => setcurrPage(2)}
          >
            2
          </Button>
          : <></>
        }
        {pages >= 3
          ? <Button
          className={currPage === 3 ? 'current-page-container' : 'page-container'}
            disabled={currPage === 3}
            onClick={(e) => setcurrPage(3)}
          >
            3
          </Button>

          : <></>
        }
        {pages >= 4
          ? <Button
          className={currPage === 4 ? 'current-page-container' : 'page-container'}
            disabled={currPage === 4}
            onClick={(e) => setcurrPage(4)}
          >
            4
          </Button>
          : <></>
        }
        {pages >= 5
          ? <Button
          className={currPage === 5 ? 'current-page-container' : 'page-container'}
            disabled={currPage === 5}
            onClick={(e) => setcurrPage(5)}
          >
            5
          </Button>
          : <></>
        }
        {pages >= 7
          ? <p style={{ marginLeft: "8px" }}>.....</p>
          : <></>
        }
        {pages >= 6
          ? <Button
          className={currPage === 6 ? 'current-page-container' : 'page-container'}
            disabled={currPage === pages}
            onClick={(e) => setcurrPage(pages)}
          >
            {pages}
          </Button>
          : <></>
        }
        <Button
          className='page-container'
          disabled={currPage === pages}
          onClick={(e) => setcurrPage(currPage + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} color="#70757A" />
        </Button>
      </div>
    </>
  )
}

export default Pagination