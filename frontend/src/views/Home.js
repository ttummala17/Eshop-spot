import * as React from 'react';
import AppBar from '../components/AppBar';
import withRoot from '../components/WithRoot';
import HomeLayout from '../components/HomeLayout';


function Home(){
    return (
        <React.Fragment>
            <AppBar/>
            <HomeLayout/>
        </React.Fragment>

    );
}

export default withRoot(Home);
