import React from "react";
import AllYear from "./AllYear.js";


class ChooseDate extends React.Component{
	constructor({setYearMonth,year,month,isShowCB}){
		super();

		this.state = {
			year,
			month,
			isShowYB : false
		}
	}

	setAllYear(year,month,isShowYB){
		this.setState({year : year , month : month , isShowYB : isShowYB});
	}

	isShowAllyear(){
		var props = {
			year : this.state.year,
			month : this.state.month,
			isShowYB : this.state.isShowYB
		}

		if(this.state.isShowYB){
			return (
				<AllYear {...props} setAllYear={(this.setAllYear).bind(this)} />
			)
		}
	}

	//组件上树之后
	componentDidMount(){
		var self = this;
		$(".month_box ul").delegate("li", "click" , function() {
			self.props.setYearMonth(self.state.year,parseInt($(this).attr("data-num")),!self.props.isShowCB);
		});	
	}

	render(){
		return (
			<div className="wrap_box">
				<div className="year_box">
					<a href="javascript:;" className="prevBtn glyphicon glyphicon-chevron-left" onClick={()=>{this.state.year == 1900 ? "return" : this.setState({year : this.state.year - 1})}}></a>
					<ul onClick={()=>{this.setState({isShowYB : !this.state.isShowYB})}}>
						<li></li>
						<li className="glyphicon glyphicon-hand-right"></li>
						<li className="cur">{this.state.year}</li>
						<li className="glyphicon glyphicon-hand-left"></li>
						<li></li>
					</ul>
					<a href="javascript:;" className="nextBtn glyphicon glyphicon-chevron-right" onClick={()=>{this.state.year == 2099 ? "return" : this.setState({year : this.state.year + 1})}}></a>
				</div>
				<div className="month_box">
					<ul>
						<li data-num="1">一月</li>
						<li data-num="2">二月</li>
						<li data-num="3">三月</li>
						<li data-num="4">四月</li>
						<li data-num="5">五月</li>
						<li data-num="6">六月</li>
						<li data-num="7">七月</li>
						<li data-num="8">八月</li>
						<li data-num="9">九月</li>
						<li data-num="10">十月</li>
						<li data-num="11">十一月</li>
						<li data-num="12">十二月</li>
					</ul>
				</div>
				{this.isShowAllyear()}
			</div>
		)
	}
}
export default ChooseDate;