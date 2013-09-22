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
			$(container).innerWidth(this.width * (this.gridSquares / 2));	// Set carousel container width based on slide widths
			$(container).innerHeight(this.width * (this.gridSquares / 2));	// Set carousel container height based on slide heights
		},

		calcGrid: function(squares) {
			var $squares = $(squares);					// Carousel slide containers
			this.gridSquares = $squares.length;			// Number of squares in grid
			this.width = $squares.eq(0).innerWidth();	// Slide width dimension
			this.height = $squares.eq(0).innerHeight(); // Slide height dimension

			// Log number of squares in grid
			console.log('gridSquares: ', this.gridSquares);
			
			// Set container dimensions
			this.setDimensions('#boxCar');

			// Set square position reference data
			this.setSquareRef($squares);
		},

		setSquareRef: function(squares, direction) {
			$(squares).each(function(index) {
				var $square = $(this);
				if ($square.data('position') === undefined ) {		// Set initial square data positions if not already set
					$square.data('position', index);				// Initial position based on slide index
				} else {
					this.updateSquareRef($square, direction);
				}
			});
		},

		updateSquareRef: function(square, direction) {
			var currentPos = square.data('position');		// Retrieve slide's relative numerical position within carousel

			// Update slide position within range
			if ((currentPos < (this.gridSquares - 1) && direction === 1) || (currentPos > 0 && direction === -1)) {
				square.data('position', currentPos + direction);
			} else if (currentPos === 0 && direction === -1) {
				square.data('position', (this.gridSquares -1));
			} else if (currentPos === (this.gridSquares -1) && direction === 1) {
				square.data('position', 0);
			}
			return square.data('position');		// Return new slide position
		}
	},

	animate: function(targets, direction) {
		var top = null,
			left = null,
			$target = $(targets);

		// Determine 'top' and 'left' values to animate to based on slide position and direction
		$target.each(function(index) {
			var $this = $(this);
			if(($this.data('position') === 2 && direction === 1) || ($this.data('position') === 3 && direction === 1) || (($this.data('position') === 0 && direction === -1) || ($this.data('position') === 1 && direction === -1))) {
				top = '0%';
			} else {
				top = '50%';
			}

			if(($this.data('position') === 2 && direction === 1) || ($this.data('position') === 3 && direction === -1) || (($this.data('position') === 0 && direction === -1) || ($this.data('position') === 1 && direction === 1))) {
				left = '0%';
			} else {
				left = '50%';
			}

			// Animate slide
			$(this).stop(true, false).animate({
				'top': top,
				'left': left
			}, 400, 'swing', function() {
				BoxCar.boxContainer.updateSquareRef($this, direction);
			});
		});
	}
}

// Trigger 'next' (CW)
$('#next').on('click', function(event) {
	event.preventDefault();
	BoxCar.animate('.box', 1);
});

// Trigger 'previous' (CCW)
$('#prev').on('click', function(event) {
	event.preventDefault();
	BoxCar.animate('.box', -1);
});

$(document).ready(function() {
	BoxCar.init();
});
