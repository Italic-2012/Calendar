import React from "react";
import createDateTable from "./createDateTable.js";
import ChooseDate from "./ChooseDate.js"

class Calendar extends React.Component{
	constructor({setDate,year,month,day,oldmonth,oldyear}){
		super();
		this.state = {
			year,
			month,
			day,
			oldmonth,
			oldyear,
			isShowCB : false
		}
	}

	showDateTable(){
		var {reararr,montharr,headarr} = createDateTable(this.state.year,this.state.month);
		var dateArr = reararr.concat(montharr,headarr);

		var trs = [];
		var tds = [];
		dateArr.forEach((item,index)=>{
			//每遍历七个td生成一个tr	
			if(index % 7 == 0 && index != 0){
				trs.push(<tr key={index}>{tds}</tr>);
				tds = [];
			}

			tds.push(<td className={index < reararr.length || index >= 42 - headarr.length ? "gray" : "" || (item == this.state.day && montharr.indexOf(item) != -1) ? "blue" : "" } key={index}>{item}</td>);
		})

		trs.push(<tr key={5}>{tds}</tr>)
		return (<tbody>{trs}</tbody>);
	}

	//下一个月
	goNextMonth(){
		if(this.state.year == 2099){
			return;
		}

		if(this.state.month == 12){
			this.setState({year : this.state.year + 1 , month : 1});
		}else{
			this.setState({month : this.state.month + 1});
		}	
	}

	//上一个月
	goPrevMonth(){
		if(this.state.year == 1900){
			return;
		}

		if(this.state.month == 1){
			this.setState({year : this.state.year - 1 , month : 12});
		}else{
			this.setState({month : this.state.month - 1});
		}	
	}

	setYearMonth(year,month,isShowCB){
		this.setState({year : year , month : month , isShowCB : isShowCB});
	}

	//显示choosebox
	showChooseBox(){
		var props = {
			year : this.state.year,
			month : this.state.month,
			isShowCB : this.state.isShowCB
		}

		if(this.state.isShowCB){
			return <ChooseDate setYearMonth={(this.setYearMonth).bind(this)} {...props}/>
		}
	}

	//组件完成上树之后
	componentDidMount(){
		var self = this;
		$("tr").delegate("td","click",function(){
			var date_num = parseInt($(this).html());
			if($(this).is(".gray")){
				if(date_num > 23){
					if(self.state.month == 1){
						self.setState({year : self.state.year - 1 , month : 12 });
					}else{
						self.setState({month : self.state.month - 1 });
					}				
				}else{
					if(self.state.month == 12){
						self.setState({year : self.state.year + 1 , month : 1 });
					}else{
						self.setState({month : self.state.month + 1 });
					}	
				}		
			}
			self.props.setDate(self.state.year,self.state.month,date_num,false);	
		})
	}

	//组件更新state之前去除blue类
	componentDidUpdate(){
		$("tr").find("td").removeClass("blue");
	}

	render(){
		return (
			<div className="date_box">
				<div className="date_title">
					<a href="javascript:;" onClick={(this.goPrevMonth).bind(this)}  className="prevBtn glyphicon glyphicon-chevron-left"></a>
					<a href="javascript:;" className="date_info" onClick={()=>{this.setState({isShowCB : !this.state.isShowCB})}}>
						{this.state.year}年{this.state.month}月
					</a>
					<a href="javascript:;" onClick={(this.goNextMonth).bind(this)} className="nextBtn glyphicon glyphicon-chevron-right"></a>
				</div>
				<table>
					<thead>
						<tr>
							{
								["周日","周一","周二","周三","周四","周五","周六"].map((item,index)=>{
									return <th key={index}>{item}</th>
								})
							}
						</tr>
					</thead>
					{ this.showDateTable() }
				</table>
				{this.showChooseBox()}
			</div>	
		)
	}
}
export default Calendar;