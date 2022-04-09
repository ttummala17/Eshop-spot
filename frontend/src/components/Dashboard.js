

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import theme from "./theme"
import Deposits from './Deposits';
import Orders from './Orders';








export default function Dashboard(props) {
    const { tableData } = props.data;
    // const [fav] = useFav();
    const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(true);

useEffect(() => {
    setTimeout(setLoaded, 1000, true);
    console.log(props.data)
    // setLoaded(true);
  }, [tableData]);
  return (
   
    
  
    <ThemeProvider theme={theme}>

{console.log(props,"inside dashboard")}
    <Box
      component= "main"

    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
        
          {/* Recent Deposits */}
          <Grid item xs= {12} md= {4} lg= {3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Deposits title="Turn over in dollars" data={props.total} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
        { props.productsSold &&  <Deposits title="Products Sold" data={props.productsSold}/> }
            </Paper>
          </Grid>   
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              
           { props.popular &&  <Deposits title="Popular Product" data={props.popular.name}/> }
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Deposits title= "Total Orders" data={props.data.length}/>
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs= {12}>
            <Paper sx= {{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders data= {props.data} />
            </Paper>
          </Grid>
        </Grid>
      
      </Container>
    </Box>

  
    </ThemeProvider>
  );

}

// export default function Dashboard() {
//   return <DashboardContent />;
// }
