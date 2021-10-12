$(function () {
	init();
	function init(){
		$("#resultSection").hide();
		var date = new Date();
		var htmlStr = "";
		//填充期数
		for(var i=69;i>=10;i--){
			htmlStr += '<option value="'+i+'">'+i+'届</option>';
		}
		$("#examOrder").append(htmlStr);
		//填充年份
    	htmlStr="";
		for(i=1960;i<=date.getFullYear();i++){
			if(i==1995){
				htmlStr += "<option value='"+i+"' selected>"+i+"</option>";
			}else{
				htmlStr += "<option value='"+i+"'>"+i+"</option>";
			}
		}
		$("#year").html(htmlStr);
		//填充月份
		htmlStr = "";
		for(i=1;i<=12;i++){
			if(i<10){
				htmlStr += "<option value='0"+i+"'>&nbsp;&nbsp;0"+i+"</option>";
			}else{
				htmlStr += "<option value='"+i+"'>&nbsp;&nbsp;"+i+"</option>";
			}
		}
		$("#month").html(htmlStr);
		getDays(31);
	}
	//确定日期
	$("#month").change(function(){
		switch(this.value){
			case "01":
				;
			case "03":
				;
			case "05":
				;
			case "07":
				;
			case "08":
				;
			case "10":
				;
			case "12":
				getDays(31);
				break;
			case "04":
				;
			case "06":
				;
			case "09":
				;
			case "11":
				getDays(30);
				break;
			case "02":
				var year = $("#year").val();
				if(year%100==0?year%400==0:year%4==0){
					getDays(29);
				}else{
					getDays(28);
				}
		}
	});
	
	
	function getDays(days){
		var htmlStr= "";
		for(var i=1;i<=days;i++){
			if(i<10){
				htmlStr += "<option value='0"+i+"'>&nbsp;&nbsp;0"+i+"</option>";
			}else{
				htmlStr += "<option value='"+i+"'>&nbsp;&nbsp;"+i+"</option>";
			}
		}
		$("#day").html(htmlStr);
	}
	
	
	$("#queryInfo").click(function(){
		if($("#examOrder").val()==null||$("#examOrder").val()==''||$("#examOrder").val()==undefined){
			alert("请输入批次");
			return;
		}
		if($("#examSeriesNumber").val()==null||$("#examSeriesNumber").val()==''||$("#examSeriesNumber").val()==undefined){
			alert("请输入考号");
			return;
		}
		var data = {
		    examOrder:$("#examOrder").val(),
	    	examBirthday:$("#year").val()+$("#month").val()+$("#day").val(),
			examSeriesNumber:$("#examSeriesNumber").val(),
		};
		$.ajax({
			url:  "/get_data?examOrder=" + $("#examOrder").val() + "&year=" + $("#year").val() +  "&month=" + $("#month").val()+ "&day=" +$("#day").val() + "&examSeriesNumber=" + $("#examSeriesNumber").val(),
			//data: data,
			type: "GET",
			success: function(reData){ 
		        showResult(reData);
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		        alert("请核对信息是否正确");
				 // 状态码
				console.log(XMLHttpRequest.status);
				// 状态
				console.log(XMLHttpRequest.readyState);
				// 错误信息   
				console.log(textStatus);
		    } 
		});
	});
	
	function showResult(reData){
		console.log(reData);
		var array = reData.split("\n");
		var htmlStr = "";
		for(var str in array){
			htmlStr += '<div class="input-row">';
			htmlStr += '<label>'+array[str]+'</label>';
			htmlStr += '</div>';
		}
		 $("#result").html(htmlStr);
		 $("#querySection").hide();
		 $("#resultSection").show();
	}
	
	
});
