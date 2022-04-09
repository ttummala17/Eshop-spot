import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from '@mui/material/Typography';
import theme from "./theme";
import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from "@mui/system";
import styles from "../assets/styles";
import VendorUpdate from "./VendorUpdate";
import VendorUpdatePassword from "./VendorUpdatePassword"
import VendorAddress from "./VendorAddress"


class VendorProfileTabs extends React.PureComponent {
    state = { activeIndex: 0 };
  
    handleChange = (_, activeIndex) => this.setState({ activeIndex });
    render() {
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
            <Tab style={styles.MyProfileTab} label="Update Address" />

          </Tabs>
          </Box>
  
          {activeIndex === 0 && <TabContainer> <VendorUpdate/> </TabContainer>}
          {activeIndex === 1 && <TabContainer> <VendorUpdatePassword/> </TabContainer>}
          {activeIndex === 2 && <TabContainer> <VendorAddress/> </TabContainer>}

        </div>

          </ThemeProvider>
      );
    }
  }
  

  
  function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 24 }}>
        {props.children}
      </Typography>
    );
  }
  
  export default VendorProfileTabs;