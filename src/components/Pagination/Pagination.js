import { useState } from "react";
import store from '../../assets/js/store';
import './Pagination.css';


const Pagination = (props) => {


    const lastPage = Math.round(props.length / 20);

    const [currentPage, setCurrentPage] =  useState(store.getPage());
    
    const style = {
        background: 'rgb(8, 70, 54)',
        color: 'white'

    }

  
    function pageNumber(value) {
       
        store.setEnd(value * 20)
        store.setStart((value * 20) - 20)
        setCurrentPage(value)
        store.setPage(value)
        props.page(store.getStart(), store.getEnd());
    }


    function next () {

        if (currentPage < lastPage){
            store.setEnd(store.getEnd() + 20)
            store.setStart(store.getStart() + 20)
            setCurrentPage(prevCount => prevCount + 1)
            store.setPage((store.getPage() + 1))
            props.page(store.getStart(), store.getEnd());
        }
       
    }


    function prev () {

        if (currentPage > 1) {
            store.setEnd(store.getEnd() - 20)
            store.setStart(store.getStart() - 20)
            setCurrentPage(prevCount => prevCount - 1)
            store.setPage((store.getPage() - 1))
            props.page(store.getStart(), store.getEnd());
        }
    }
 

    
    return(
        <div className='container'>
            <ul>
                {currentPage <= 1 && (
                <>
                    <li onClick={prev}> « </li>
                    <li onClick={() => pageNumber(currentPage)} style={style}> {currentPage} </li>
                    <li onClick={() => pageNumber(currentPage + 1)}> {currentPage + 1} </li>
                    <li onClick={() => pageNumber(currentPage + 2)}> {currentPage + 2} </li>
                    <li>...</li>
                    <li onClick={() => pageNumber(lastPage)}> Última </li>
                    <li onClick={next}> » </li>
                </>
                )}

                {currentPage >= 2 && currentPage < lastPage && (
                <>
                    <li onClick={prev}> « </li>
                    <li onClick={() => pageNumber(1)}> Primeira </li>
                    {currentPage > 2 && <li onClick={() => pageNumber(currentPage - 2)}> {currentPage - 2} </li> }
                    <li onClick={() => pageNumber(currentPage - 1)}> {currentPage - 1} </li>
                    <li onClick={() => pageNumber(currentPage)} style={style}> {currentPage} </li>
                    <li onClick={() => pageNumber(currentPage + 1)}> {currentPage + 1} </li>
                    { currentPage < lastPage - 1 && <li onClick={() => pageNumber(currentPage + 2)}> {currentPage + 2} </li>}
                    <li onClick={() => pageNumber(lastPage)}> Última </li>
                    <li onClick={next}> » </li>  
                </>
                )}

                {currentPage >= lastPage && (
                <>
                    <li onClick={prev}> « </li>
                    <li onClick={() => pageNumber(1)}> Primeira </li>
                    <li> ... </li>
                    <li onClick={() => pageNumber(currentPage - 2)}> {currentPage - 2} </li>
                    <li onClick={() => pageNumber(currentPage - 1)}> {currentPage - 1} </li>
                    <li onClick={() => pageNumber(currentPage)} style={style}> {currentPage} </li>
                    <li onClick={next}> » </li> 
                </>
                )}
            </ul>
        </div>
    )
}

export default Pagination;
