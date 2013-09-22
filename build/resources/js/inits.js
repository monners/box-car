/**
*-------------------------
* MAIN vendor javascript file
*-------------------------
**/


var BoxCar = {
	init: function() {
		this.boxContainer.calcGrid('.box');
		// this.animate('.box');
	},
	
	boxContainer: {
		width: 0,
		height: 0,
		gridSquares: 0,
		setDimensions: function(container) {
			$(container).innerWidth(this.width * (this.gridSquares / 2));
			$(container).innerHeight(this.width * (this.gridSquares / 2));
			console.log('width: ', this.width);
			console.log('height: ', this.height);
		},
		calcGrid: function(squares) {
			var $squares = $(squares);
			this.gridSquares = $squares.length;
			this.width = $squares.eq(0).innerWidth();
			this.height = $squares.eq(0).innerHeight();

			console.log('gridSquares: ', this.gridSquares);
			

			// Set container dimensions
			this.setDimensions('#boxCar');

			// Set square position reference data
			this.setSquareRef($squares);
		},
		setSquareRef: function(squares, direction) {
			$(squares).each(function(index) {
				var $square = $(this);
				if ($square.data('position') === undefined ) {
					$square.data('position', index);
					console.log("This square's position is ", $square.data('position'));
				} else {
					this.updateSquareRef($square, direction);
				}
			});
		},
		updateSquareRef: function(square, direction) {
			var currentPos = square.data('position');
			if ((currentPos < (this.gridSquares - 1) && direction === 1) || (currentPos > 0 && direction === -1)) {
				square.data('position', currentPos + direction);
			} else if (currentPos === 0 && direction === -1) {
				square.data('position', (this.gridSquares -1));
			} else if (currentPos === (this.gridSquares -1) && direction === 1) {
				square.data('position', 0);
			}
			return square.data('position');
		}
	},

	animate: function(targets, direction) {
		var top = null,
			left = null,
			$target = $(targets);

		$target.each(function(index) {
			var $this = $(this);
			if(($(this).data('position') === 2 && direction === 1) || ($(this).data('position') === 3 && direction === 1) || (($(this).data('position') === 0 && direction === -1) || ($(this).data('position') === 1 && direction === -1))) {
				top = '0%';
			} else {
				top = '50%';
			}

			if(($(this).data('position') === 2 && direction === 1) || ($(this).data('position') === 3 && direction === -1) || (($(this).data('position') === 0 && direction === -1) || ($(this).data('position') === 1 && direction === 1))) {
				left = '0%';
			} else {
				left = '50%';
			}
			console.log(direction);

			$(this).animate({
				'top': top,
				'left': left
			}, 600, function() {
				BoxCar.boxContainer.updateSquareRef($this, direction);
			});
		});
	}
}

$('#next').on('click', function(event) {
	event.preventDefault();
	BoxCar.animate('.box', 1);
});

$('#prev').on('click', function(event) {
	event.preventDefault();
	BoxCar.animate('.box', -1);
});

$(document).ready(function() {
	BoxCar.init();
});
