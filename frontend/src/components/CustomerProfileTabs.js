import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from '@mui/material/Typography';
import theme from "./theme";
import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from "@mui/system";
import styles from "../assets/styles";
import CustomerUpdate from "./CustomerUpdate";
import AddAddress from "./AddAddressForm"
import ManageAddress from "./ManageAddresses"
import CustomerUpdatePassword from "./CustomerUpdatePassword"
import CustomerOrders from "../views/CustomerOrders"


class CustomerProfileTabs extends React.PureComponent {
    state = this.props
    handleChange = (_, activeIndex) => this.setState({ activeIndex });

    render() {
      console.log(this.props,"-- props", this.state , "   state")
      const { activeIndex } = this.state;
      return (
        <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex", paddingTop: "10px"
          }}
        >
          <Box style={styles.MyProfileTabsBox}>
          <Tabs value={activeIndex} onChange={this.handleChange} orientation="vertical" >
            <Tab style={styles.MyProfileTab} label="Update my details" />
            <Tab style={styles.MyProfileTab} label="Update password" />
            <Tab style={styles.MyProfileTab} label="My Orders" />
            <Tab style={styles.MyProfileTab} label="My Addresses" />

          </Tabs>
          </Box>
  
          {activeIndex === 0 && <TabContainer > <CustomerUpdate /> </TabContainer>}
          {activeIndex === 1 && <TabContainer> <CustomerUpdatePassword/> </TabContainer>}
          {activeIndex === 2 && <TabContainer><CustomerOrders/></TabContainer>}
          {activeIndex === 3 && <TabContainer ><ManageAddress/></TabContainer>}

        </div>

          </ThemeProvider>
      );
    }
  }
  

  
  function TabContainer(props) {
    return (
      <Typography component="div"  style={styles.TypographyTabContainer}>
        {props.children}
      </Typography>
    );
  }
  
  export default CustomerProfileTabs;
