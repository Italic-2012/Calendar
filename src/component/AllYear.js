import React from "react";


class AllYear extends React.Component{
	constructor({setAllYear,year,month,isShowYB}){
		super();

		this.state = {
			year,
			month
		}
	}

	showAllyear(){
		var yearArr = [];
		var firstYear = parseInt(this.state.year / 10) * 10;

		for(var i = firstYear - 1 ; i < firstYear + 11 ; i++){
			if(i == 1899){
				yearArr.push(undefined);
			}else if(i == 2100){
				yearArr.push(undefined);	
			}else{
				yearArr.push(i);
			}
		}

		return (
			<div>
				<div className="top_box">
				<a href="javascript:;" className="prevBtn glyphicon glyphicon-chevron-left" onClick={()=>{firstYear == 1900 ? "return" : this.setState({year : this.state.year - 10});}}></a>
				<span>{firstYear}-{firstYear + 9}</span>
				<a href="javascript:;" className="nextBtn glyphicon glyphicon-chevron-right" onClick={()=>{firstYear  == 2090 ? "return" : this.setState({year : this.state.year + 10});}}></a>
				</div>
				<div className="allyear_list">
					<ul>
						{
							yearArr.map((item,index)=>{
								return <li key={index} className={index == 0 || index == 11 ? "gray" : "" || item == this.state.year ? "blue" : ""}>{item}</li>
							})
						}
					</ul>
				</div>
			</div>
		)
		
	}

	//组件上树之后
	componentDidMount(){
		var self = this;
		$(".allyear_list ul").delegate("li", "click" , function() {
			var li_value = parseInt($(this).html());
			if(li_value){
				self.props.setAllYear(parseInt(li_value),self.state.month,!self.props.isShowYB);
			}
		});
	}

	render(){
		return (
			<div className="allyear_box">
				{this.showAllyear()}
			</div>
		)
	}
}
export default AllYear;