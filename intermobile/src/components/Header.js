import Stack from 'react-bootstrap/Stack';
import logo from '../vendor/logo.svg'
import pfp from '../vendor/hehungers.png'

function Header()
{
    return(
        <Stack direction="horizontal" gap={3}>
            <div className="p-2"><img src={logo} alt="logo" class="logo_nav"/></div>
            <div style={{ fontSize: '20' }} className="p-2 ms-auto fs-3s">HungryDued</div>
            <div className="p-2"><img src={pfp} alt="Pfp" class="pfp"/></div>
        </Stack>
    );
}

export default Header