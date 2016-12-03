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
						<p>Cholesterol: <span class="cholesterol">${food.fields.nf_cholesterol}</span></p>
						<p>Sugars: <span class="sugars">${food.fields.nf_sugars}</span></p>
						<p>Sodium: <span class="sodium">${food.fields.nf_sodium}</span></p>
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

app.parseData = function(dataSelected){
	var data = dataSelected;
	console.log(data);
	
	if (data === 'null'){
		data = 0;
		console.log("new:" + data);
		return data;
	}
	else{
		return data;

	}

	
}

app.init = function(){
	$('form').on('submit', function(event){
		event.preventDefault();
		var value = $(this).children('[name=search]').val();
		app.ajaxCall(value);	
	});

	$('.foodCall').on('click', '.food', function(){
		var $this = $(this);

		app.nutri.calories.push(Math.round(parseFloat(app.parseData($this.find('.calories').text()))* 10) / 10);
		app.nutri.fat.push(Math.round(parseFloat(app.parseData($this.find('.fat').text()))* 10) / 10);
		app.nutri.cholesterol.push(Math.round(parseFloat(app.parseData($this.find('.cholesterol').text()))* 10) / 10);
		app.nutri.sugars.push(Math.round(parseFloat(app.parseData($this.find('.sugars').text()))* 10) / 10);
		app.nutri.sodium.push(Math.round(parseFloat(app.parseData($this.find('.sodium ').text()))* 10) / 10);

		/*var caloriee = $this.find('.calories').text();

		if ( caloriee === "null"){
			caloriee = "0";

			console.log(caloriee);
			return caloriee;
		}*/

	

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

	


}

$(function(){
	app.init();
});