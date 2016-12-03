var app = {};

app.key = 'a6bb05d3c2ee035be37486ffa23ee061';
app.id = '49ee0fd8';
app.calories = [];

app.ajaxCall = function(searchTerm){
	var nutritionApi = $.ajax({
		url: `https://api.nutritionix.com/v1_1/search/${searchTerm}?results=0:6&fields=brand_name,nf_calories,nf_total_fat,nf_cholesterol,nf_sugars,nf_sodium,item_name,brand_id`,
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
					<div class="inner">
						<p class="food-name">${food.fields.item_name}</p>
						<p class="food-brand">${food.fields.brand_name}</p>
						<p>Calories: <span class="calories">${food.fields.nf_calories}</span></p>
						<p>Fat: <span class="fat">${food.fields.nf_total_fat}</span></p>
						<p>Cholesterol: <span class="fat">${food.fields.nf_cholesterol}</span></p>
						<p>Sugars: <span class="fat">${food.fields.nf_sugars}</span></p>
						<p>Sodium: <span class="fat">${food.fields.nf_sodium}</span></p>
					</div>
				</div>
			`;
			return foodHTML;
		}).join(' ');


	$('.food-container .foodCall').html(foodList);
}

app.totalNutrients = function(){
	var sumOfNutrients = app.calories
	.map(function(calorie){
		return parseFloat(calorie);
	})
	.reduce(function(total, nutrient){
		return total + nutrient;
	}, 0);

	

	$('.calories h1').html(sumOfNutrients);

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
		$(this).children('.inner').addClass('selected');

		app.totalNutrients();
	
	});

	


}

$(function(){
	app.init();
});