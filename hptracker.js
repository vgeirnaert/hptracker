let index = 1;

$(document).ready(function() {
	$('#refreshButton').on('click', function() {
		index = 1;
	});

	$('#newButton').on('click', function() {
		var maxHp = prompt("Enter max HP", "");
		let newCounterHtml = 
			`<div class="column col-2 col-md-3 counterContainer" data-max="${maxHp}" data-index="">
				<div class="divider text-center" data-content=""></div>
				<form class="form-horizontal">
					<div class="input-group">
						<span class="input-group-addon text-dark"></span>
						<input class="form-input" type="number" value="${maxHp}">
					</div>
				</form>
				<progress class="progress" value="${maxHp}" max="${maxHp}"></progress>
				<button class="btn js-duplicate-button">Duplicate</button> <button class="btn btn-link text-warning float-right js-remove-button">Remove</button>
			</div>`;

		let newCounter = $(newCounterHtml);
		
		setEvents(newCounter);
		
		appendCounter(newCounter);
		
	});
});

function appendCounter(counter) {
	counter.data('index', index);
	counter.find('.divider').attr('data-content', index);
	counter.find('.input-group-addon').html(index);
	$('#countersContainer').append(counter);
	index++;
}

function setEvents(counter) {
	counter.find('input').on('focusin', function() {
		const oldValue = $(this).val() || 0;
		$(this).data('oldValue', oldValue);
		$(this).val('');
	});

	counter.find('input').on('keypress', function(e) {
		if(e.keyCode == 13) {
			$(this).blur();
			return false;
		}
	});

	counter.find('input').on('focusout', function() {
		const oldValue = parseInt($(this).data('oldValue'));
		const modifyValue = parseInt($(this).val() || 0);
		const newValue = isNaN(oldValue) ? modifyValue : oldValue + modifyValue;
		
		$(this).data('oldValue', 0);
		$(this).val(newValue);

		$(this).closest('.counterContainer').find('.progress').attr('value', newValue);

		if(isNaN(oldValue) || oldValue === 0) {
			$(this).closest('.counterContainer').find('.progress').attr('max', newValue);
		}
	});

	counter.find('.js-remove-button').on('click', function() {
		$(this).closest('.counterContainer').remove();
	});

	counter.find('.js-duplicate-button').on('click', function() {
		let clone = $(this).closest('.counterContainer').clone();
		setEvents(clone);
		appendCounter(clone);
	});
}