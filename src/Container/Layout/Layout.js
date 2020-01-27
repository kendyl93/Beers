import React, { Component, Fragment } from 'react';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
//import SearchPanel from '../../Components/Navigation/SearchPanel/SearchPanel'

class Layout extends Component {
	state = {
		isSideDrawerShown: false
	}

	sideDrawerShowHandler = () => {
		this.setState({ isSideDrawerShown: true })
	}

	sideDrawerHideHandler = () => {
		this.setState({ isSideDrawerShown: false })
	}

	render() {
		return (
			<Fragment>
				<Toolbar sideDrawerShowHandler={this.sideDrawerShowHandler}/>
				<SideDrawer
					open={this.state.isSideDrawerShown}
					closed={this.sideDrawerHideHandler}
				/>
				{this.props.children}
			</Fragment>
		)
	}
}
export default Layout