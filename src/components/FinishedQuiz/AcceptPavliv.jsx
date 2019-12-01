import React, { Component } from 'react';


// створюєш компоненту для рендеру кнопки
const ButtonItem = ({label, isSuccess, setStatus}) => (
	<button
		// перевіряєш який стан в кнопки і відповідно встановлюєш колір
		style={{backgroundColor: isSuccess ? 'green': 'red'}}
		onClick={setStatus}
	>
		{label}
	</button>
)

export default class Buttons extends Component {
	state = {
		buttonsArray: [
			{
				label: 1,
				isSuccess: false
			},
			{
				label: 2,
				isSuccess: false
			},
			{
				label: 3,
				isSuccess: false
			},
			{
				label: 4,
				isSuccess: false
			},
			{
				label: 5,
				isSuccess: false
			}
		]
	}

	setStatus = (index) => {
		// копіюєш обєкт зі стейту
		const copy = [...this.state.buttonsArray];
		// міняєш значення стану на протилежне в скопійованому обєкті
		copy[index].isSuccess = !copy[index].isSuccess;
		this.setState({
			// перезаписуєш в стейті масив з новим станом в кнопки
			buttonsArray: copy
	})
}

	render() {
		return (
			this.state.buttonsArray.map((button, i)=> (
					<ButtonItem
						key={i}
						label={button.label}
						isSuccess={button.isSuccess}
						setStatus={() => this.setStatus(i)}
						
					/>
				))
			);
	}
}