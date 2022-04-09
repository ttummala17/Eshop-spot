import * as React from 'react';
import { MenuItem } from '@mui/material';
import withRoot from './WithRoot';
import { useState, useEffect } from "react"



//----------------------------------------------------------------------------------


function MenuItems(props)  {
    const [items, setItems] = useState(props.items);

  return (
             items.map(st => (
                <MenuItem key={st.value} value={st.value}>{st.label}</MenuItem>
            ))
  );
}

export default withRoot(MenuItems);