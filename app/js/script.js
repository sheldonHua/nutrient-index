var app = {};

app.key = 'a6bb05d3c2ee035be37486ffa23ee061';
app.id = '49ee0fd8';
app.calories = [];

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
	var foodList = foods.map(function(food){
			var foodHTML = `
				<div class="food">
					<p>${food.fields.brand_name}</p>
					<p>${food.fields.item_name}</p>
					<p>Calories: <span class="calories">${food.fields.nf_calories}</span></p>
				</div>
			`;
			return foodHTML;
		}).join(' ');


	$('.food-container .foodCall').html(foodList);
}


app.init = function(){
	$('form').on('submit', function(event){
		event.preventDefault();
		var value = $(this).children('[name=search]').val();
		app.ajaxCall(value);	
	});

	$('.foodCall').on('click', '.food', function(){
		var userSelected = $(this).find('.calories').text();

		app.calories.push(userSelected);


	});

}

$(function(){
	app.init();
});