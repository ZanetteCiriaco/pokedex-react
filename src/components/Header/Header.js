import history  from '../../history';
import './Header.css'

const Header = (props) => {

    const withBtn =  props.withBtn;
    
    function redirect () {
        history.push('/');
    }


    return (
        <div className='header'>
            {withBtn ? (
                <>
                    <button onClick={redirect}></button>
                    <h1> {props.name}</h1>
                    <div className='icon'></div>
                </>
            ): (
                <>
                    <h1> {props.name}</h1>
                    <div className='icon'></div>
                </>
            )}

        </div>
    )
}

export default Header;