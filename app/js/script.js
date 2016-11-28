var app = {};

app.key = 'a6bb05d3c2ee035be37486ffa23ee061';
app.id = '49ee0fd8';

app.ajaxCall = function(searchTerm){
	var nutritionApi = $.ajax({
		url: `https://api.nutritionix.com/v1_1/search/${searchTerm}?results=0:10&fields=brand_name,nf_calories,item_name,brand_id`,
		type: 'GET',
		dataType: 'json',
		data:{
			appKey: app.key,
			appId: app.id,
			format: 'json',
		},
		success: function(data){

			app.displayData(data.hits);
		}
		
	});	
}

app.displayData = function(foods){

	var foodList = [];
	for (var i = 0; i <= foods.length-1; i++){
		var foodHTML = `
			<div class="food">
				<p>${foods[i].fields.item_name}</p>
				<p>${foods[i].fields.brand_name}</p>
				<p>Calories: ${foods[i].fields.nf_calories}</p>
			</div>
		`;

		foodList.push(foodHTML);
	}

	

	$('.food-container').append(foodList);


}

app.init = function(){

	$('.searchForm').on('submit', function(event){
		event.preventDefault();
		var value = $(this).children('[name=search]').val();
		app.ajaxCall(value);
	});


	
}

$(function(){
	app.init();
});