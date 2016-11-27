var app = {};

app.key = 'a6bb05d3c2ee035be37486ffa23ee061';
app.id = '49ee0fd8';

app.ajaxCall = function(searchTerm){
	$.ajax({
		url: `https://api.nutritionix.com/v1_1/search/${searchTerm}?results=0:10&fields=brand_name,nf_calories,item_name,brand_id`,
		type: 'GET',
		dataType: 'json',
		data:{
			appKey: app.key,
			appId: app.id,
			format: 'json',
		},
		success: function(data){

			var items = data.hits;
			console.log(items);

			for(var i=0; i<= items.length-1; i++){
				console.log(items[i].fields.item_name);
			}
		}
	});			
}

app.init = function(){
	app.ajaxCall("popeyes");
}

$(function(){
	app.init();
});