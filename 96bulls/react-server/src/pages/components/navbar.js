import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = {
root: {
flexGrow: 1,
},
menuButton: {
marginRight: 'auto'
},
};

export class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        toggle: false
        };
    }
    handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                        <MenuIcon/>
                    </IconButton>
                </AppBar>
                <Drawer open={this.state.toggle}>
                    <MenuItem onClick={this.handleDrawerToggle} > <Link to="/Home">home</Link></MenuItem>
                    <MenuItem type="button"> Sign Out </MenuItem>
                </Drawer>
            </div>
        );
    }
}
export default withStyles(styles)(NavBar);