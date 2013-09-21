/**
*-------------------------
* MAIN vendor javascript file
*-------------------------
**/


var BoxCar = {
	init: function() {
		this.boxContainer.calcGrid('.box');
		this.animate('.box');
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
		setSquareRef: function(squares) {
			$(squares).each(function(index) {
				var $square = $(this);
				if ($square.data('position') === undefined ) {
					$square.data('position', index);
					console.log("This square's position is ", $square.data('position'));
				} else {
					this.updateSquareRef($square);
				}
			});
		},
		updateSquareRef: function(square) {
			var currentPos = square.data('position');
			if (currentPos < this.gridSquares - 1) {
				square.data('position', currentPos + 1);
			} else {
				square.data('position', 0);
			}
			return square.data('position');
		}
	},

	animate: function(targets) {
		var top = null,
			left = null,
			$target = $(targets);

		$target.each(function(index) {
			if(($(this).data('position') === 0) || ($(this).data('position') === 3)) {
				top = '0%';
			} else {
				top = '50%';
			}

			if(($(this).data('position') === 2) || ($(this).data('position') === 3)) {
				left = '0%';
			} else {
				left = '50%';
			}

			$(this).animate({
				'top': top,
				'left': left
			}, function() {
				BoxCar.boxContainer.updateSquareRef($(this));
			});
		});
	}
}

$('#next, #prev').on('click', function() {
	BoxCar.animate('.box');
});
