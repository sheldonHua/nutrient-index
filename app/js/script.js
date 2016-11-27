var app = {};

app.key = 'a6bb05d3c2ee035be37486ffa23ee061';
app.id = '49ee0fd8';

app.googleKey = "AIzaSyA6zMuLyh7L4KPbAVuzlNNrzo5WThY4NVg";
app.searchEngineId = "013423621592567787184:r8jnaxylyeu"

app.ajaxCall = function(searchTerm){
	var nutritionApi = $.ajax({
		url: `https://api.nutritionix.com/v1_1/search/${searchTerm}?results=0:10&fields=brand_name,nf_calories,item_name,brand_id`,
		type: 'GET',
		dataType: 'json',
		data:{
			appKey: app.key,
			appId: app.id,
			format: 'json',
		}
		
	});	
	var googleSearch = $.ajax({
		url: `https://www.googleapis.com/customsearch/v1?parameters`,
		type: 'GET',
		dataType: 'json',
		data:{
			key: app.googleKey,
			cx: app.searchEngineId,
			q: searchTerm,
			searchType: "image",
			format: 'json',
		},
	});	

	$.when(nutritionApi, googleSearch).then(function(nutritionApiData, googleSearchData){
		console.log(nutritionApiData,googleSearchData );
	})		
}

app.init = function(){
	app.ajaxCall("burger");
}

$(function(){
	app.init();
});