import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import WithClass from '../../hoc/WithClass'
// import Aux from '../../hoc/Aux'
import classes from './SearchPanel.scss'

class SearchPanel extends Component {
	state={
		inputText: 'hello input'
	}

	inputQuery = (e) => {
		this.setState({ inputText: e.target.value})
	}

	componentDidMount = () => {
		this.elementInFocus.focus()
	}
	
	render() {
		return (
			<Aux>
				<input
					type='text'
					ref={(input) => {this.elementInFocus = input}}
					value={this.state.inputText}
					onChange={(e)=>this.inputQuery(e)}
				/>
			</Aux>
		)
	}
}

export default WithClass(SearchPanel, classes.SearchPanel)