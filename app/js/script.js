var app = {};

app.key = 'a6bb05d3c2ee035be37486ffa23ee061';
app.id = '49ee0fd8';
app.nutri = {
	calories: [],
	fat: [],
	cholesterol: [],
	sugars: [],
	sodium: []
};

app.ajaxCall = function(searchTerm){
	var nutritionApi = $.ajax({
		url: `https://api.nutritionix.com/v1_1/search/${searchTerm}?results=0:50&fields=brand_name,nf_calories,nf_total_fat,nf_cholesterol,nf_sugars,nf_sodium,item_name,brand_id`,
		type: 'GET',
		dataType: 'json',
		data:{
			appKey: app.key,
			appId: app.id,
			format: 'json',
		},
		success: function(data){
			app.displayData(data.hits);
			console.log(data.hits);
			app.n = 6;

			if (data.hits.length-1 > 6){
				$('.loadMore').addClass('show');
			}
			else{
				$('.loadMore').removeClass('show');
			}
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
						<p class="nutri">Calories <span class="unit">(kcal)</span>: <span class="nutri-type calories">${food.fields.nf_calories}</span></p>
						<p class="nutri">Fat <span class="unit">(g)</span>: <span class="nutri-type fat">${food.fields.nf_total_fat}</span></p>
						<p class="nutri">Cholesterol <span class="unit">(mg)</span>: <span class="nutri-type cholesterol">${food.fields.nf_cholesterol}</span></p>
						<p class="nutri">Sugars <span class="unit">(g)</span>: <span class="nutri-type sugars">${food.fields.nf_sugars}</span></p>
						<p class="nutri">Sodium <span class="unit">(mg)</span>: <span class="nutri-type sodium">${food.fields.nf_sodium}</span></p>
					</div>
				</div>
			`;
			return foodHTML;
		}).join(' ');

	$('.food-container .foodCall').html(foodList);
}

app.totalNutrients = function(nutri, selector){
	var sumOfNutrients = nutri
	.reduce(function(total, nutrient){
		return total + nutrient;
	}, 0);

	$(selector).html(sumOfNutrients);

}

app.parseData = function(dataSelected, nutriType){
	var data = dataSelected;

	if (data === 'null'){
		data = 0;
		return Math.round((parseFloat(data)* 10) / 10);
	}
	else{
		return Math.round((parseFloat(data)* 10) / 10);
	}

}

app.init = function(){
	$('form').on('submit', function(event){
		event.preventDefault();
		var value = $(this).children('[name=search]').val();
		app.ajaxCall(value);	

	});



	$('.food-container').on('click', '.food', function(){
		var $this = $(this);

		app.nutri.calories.push(app.parseData($this.find('.calories').text()));
		app.nutri.fat.push(app.parseData($this.find('.fat').text()));
		app.nutri.cholesterol.push(app.parseData($this.find('.cholesterol').text()));
		app.nutri.sugars.push(app.parseData($this.find('.sugars').text()));
		app.nutri.sodium.push(app.parseData($this.find('.sodium ').text()));

		app.totalNutrients(app.nutri.calories, '.calories h1');
		app.totalNutrients(app.nutri.fat, '.fat h1');
		app.totalNutrients(app.nutri.cholesterol, '.cholesterol h1');
		app.totalNutrients(app.nutri.sugars, '.sugars h1');
		app.totalNutrients(app.nutri.sodium, '.sodium h1');

		$(this).children('.inner').addClass('selected').delay(200).queue(function(next){
			$(this).removeClass('selected');
			next();
		});

		


	});

	app.n = 6;

	$('.food-container').on('click', '.loadMore' , function(){
			app.n = app.n + 6;
			console.log(app.n)
			$(`.foodCall .food:lt(${app.n})`).addClass('show');

			if ($('.foodCall .food.show').length === $('.foodCall .food').length){
				$('.loadMore').removeClass('show');
				app.n = 0;
			}
	});

	$('.reset').on('click', function(){
		app.nutri.calories.length = 0;
		app.nutri.fat.length  = 0;
		app.nutri.cholesterol.length  = 0;
		app.nutri.sugars.length  = 0;
		app.nutri.sodium.length  = 0;

		$('.nutri h1').html("0");

	});
}

$(function(){
	app.init();
});