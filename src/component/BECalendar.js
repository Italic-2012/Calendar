import React from "react";
import Calendar from "./Calendar.js"
import "../less/style.less";

class BECalendar extends React.Component{
	constructor(){
		super();

		var d = new Date();

		this.state = {
			year : d.getFullYear(),
			month : d.getMonth() + 1,
			day : d.getDate(),
			oldmonth : d.getMonth() + 1,
			oldyear : d.getFullYear(),
			isShowCalendar : false
		}
	}

	showCalendar(){
		var props = {
			year : this.state.year,
			month : this.state.month,
			day : this.state.day,
			oldmonth : this.state.oldmonth,
			oldyear : this.state.oldyear
		}

		if(this.state.isShowCalendar){
			return <Calendar {...props} setDate={(this.set_Date).bind(this)}/>
		}
	}

	set_Date(year,month,day,isShowCalendar){
		this.setState({year : year , month : month , day : day , isShowCalendar : isShowCalendar});
	}

	render(){
		return (
			<div className="wrap_box">
				<div className="date_info_box" onClick={()=>{this.setState({ isShowCalendar : !this.state.isShowCalendar })}}>
					{this.state.year}-{this.state.month}-{this.state.day}
					<span className="glyphicon glyphicon-calendar"></span>
				</div>
				{this.showCalendar()}
			</div>
		)
	}
}
export default BECalendar;