//得到某年某月第一天星期几
function firstDay(year,month){
	return (new Date(year,month - 1,1)).getDay();
}

//得到某年某月的上一个月共多少天
function getPrevMonthDays(year,month){
	return (new Date(new Date(year,month - 1,1) - 1)).getDate();
}

//得到某年某月共多少天
function getMonthDays(year,month){
	if(month == 12){
		return (new Date(new Date(year + 1 , 0 , 1) - 1)).getDate();
	}else{
		return (new Date(new Date(year , month , 1) - 1)).getDate();
	}
}

function createDateTable(year,month){
	var reararr = [23,24,25,26,27,28,29,30,31];
	var montharr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	var headarr = [1,2,3,4,5,6,7,8,9,10,11,12,13];

	var _firstDay = firstDay(year,month);
	var _getPrevMonthDays = getPrevMonthDays(year,month);

	//获取上个月需要显示的日期数组
	//先处理掉尾巴
	for(var i = 0 ; i < 31 - _getPrevMonthDays ; i++){
		reararr.pop();
	}

	reararr = (function(){
		if(_firstDay == 0){
			return reararr.slice(-7);
		}else{
			return reararr.slice(-_firstDay);
		}
	})();

	//获取本月需要显示的日期数组
	montharr = montharr.slice(0 , getMonthDays(year,month));

	//获取下月需要显示的日期数组
	headarr  = headarr.slice(0,42 - montharr.length - reararr.length);

	return {
		reararr,
		montharr,
		headarr
	}
}

export default createDateTable;