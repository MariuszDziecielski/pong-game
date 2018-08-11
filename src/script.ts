class Game {

	gameElement: HTMLElement = document.getElementById('game');
	gameElementWidth: number = this.gameElement.offsetWidth;
	gameElementHeight: number = this.gameElement.offsetHeight;

	canvas: HTMLCanvasElement = document.querySelector('canvas');
	canvasWidth: number = this.canvas.width = this.gameElementWidth;
	canvasHeight: number = this.canvas.height = this.gameElementHeight;
	canvasElementsRatio: number = this.gameElementWidth / 1200;
	context: CanvasRenderingContext2D = this.canvas.getContext('2d');

	ball: any = {
		dimensions: <number>18 * this.canvasElementsRatio,
		xPostition: {
			initial: <number>0,
			change: <number>1.5 * this.canvasElementsRatio
		},
		yPostition: {
			initial: <number>0,
			change: <number>1.5 * this.canvasElementsRatio
		},
	};

	paddle = {
		height: <number>120 * this.canvasElementsRatio,
		width: <number>18 * this.canvasElementsRatio,
		player: {
			xPostition: <number>60 * this.canvasElementsRatio,
			yPostition: <number>0
		},
		computer: {
			xPostition: <number>0,
			yPostition: <number>0
		}
	};

	constructor() {
		this.paddle.player.yPostition = (this.canvasHeight - this.paddle.height) / 2;
		this.paddle.computer.xPostition = this.canvasWidth - (this.paddle.player.xPostition + this.paddle.width);
		this.paddle.computer.yPostition = (this.canvasHeight - this.paddle.height) / 2;
		this.ball.xPostition.initial = this.canvasWidth / 2 - this.ball.dimensions / 2;
		this.ball.yPostition.initial = this.canvasHeight / 2 - this.ball.dimensions / 2
	}

	drawPlayerPaddle(): void {
		this.context.fillStyle = 'orange';
		this.context.fillRect(this.paddle.player.xPostition, this.paddle.player.yPostition, this.paddle.width, this.paddle.height);
	}

	drawComputerPaddle(): void {
		this.context.fillStyle = '#80ff80';
		this.context.fillRect(this.paddle.computer.xPostition, this.paddle.computer.yPostition, this.paddle.width, this.paddle.height);
	}

	drawBall(): void {
		this.context.fillStyle = '#fff7cc';
		this.context.fillRect(this.ball.xPostition.initial, this.ball.yPostition.initial, this.ball.dimensions, this.ball.dimensions);

		this.ball.xPostition.initial += this.ball.xPostition.change;
		this.ball.yPostition.initial += this.ball.yPostition.change;

		if (this.ball.yPostition.initial <= 0 || this.ball.yPostition.initial + this.ball.dimensions >= this.canvasHeight) {
			this.ball.yPostition.change = -this.ball.yPostition.change;
			this.setBallXPostitionChange();
		}

		if (this.ball.xPostition.initial <= 0 || this.ball.xPostition.initial + this.ball.dimensions >= this.canvasWidth) {
			this.ball.xPostition.change = -this.ball.xPostition.change;
			this.setBallXPostitionChange();
		}
	}

	drawTable(): void {
		const courtLineWidth: number = 5 * this.canvasElementsRatio,
			courtLineHeight: number = 28 * this.canvasElementsRatio;

		this.context.fillStyle = '#006400';
		this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

		for (let lineYPosition = 18 * this.canvasElementsRatio; lineYPosition < this.canvasHeight; lineYPosition += 46 * this.canvasElementsRatio) {
			this.context.fillStyle = '#ccffcc';
			this.context.fillRect(this.canvasWidth / 2 - courtLineWidth / 2, lineYPosition, courtLineWidth, courtLineHeight);
		}
	}

	setPlayerPaddleYPostition(event: any): void {
		const canvasPosition: ClientRect = game.canvas.getBoundingClientRect();
		game.paddle.player.yPostition = event.clientY - canvasPosition.top - game.paddle.height / 2;

		if (game.paddle.player.yPostition >= game.canvasHeight - game.paddle.height) {
			game.paddle.player.yPostition = game.canvasHeight - game.paddle.height;
		}
		if (game.paddle.player.yPostition <= 0) {
			game.paddle.player.yPostition = 0;
		}
	}

	setBallXPostitionChange(): void {
		if (this.ball.xPostition.change > 0 && this.ball.xPostition.change < 16 * this.canvasElementsRatio) {
			this.ball.xPostition.change += 0.2 * this.canvasElementsRatio;
		} else if (this.ball.xPostition.change < 0 && this.ball.xPostition.change > -16 * this.canvasElementsRatio)
			this.ball.xPostition.change -= 0.2 * this.canvasElementsRatio;

		if (this.ball.yPostition.change > 0 && this.ball.yPostition.change < 16 * this.canvasElementsRatio) {
			this.ball.yPostition.change += 0.2 * this.canvasElementsRatio;
		} else if (this.ball.yPostition.change < 0 && this.ball.yPostition.change > -16 * this.canvasElementsRatio)
			this.ball.yPostition.change -= 0.2 * this.canvasElementsRatio;
	}

	setComputerPaddleYPostition(): void {
		const centerPaddle: number = this.paddle.computer.yPostition + this.paddle.height / 2,
			centerBall: number = this.ball.yPostition.initial + this.ball.dimensions / 2;

		if (this.ball.xPostition.initial > this.canvasWidth / 2) {
			if (centerPaddle - centerBall > 200 * this.canvasElementsRatio) {
				this.paddle.computer.yPostition -= 24 * this.canvasElementsRatio;
			} else if (centerPaddle - centerBall > 50 * this.canvasElementsRatio) {
				this.paddle.computer.yPostition -= 10 * this.canvasElementsRatio;
			} else if (centerPaddle - centerBall < -200 * this.canvasElementsRatio) {
				this.paddle.computer.yPostition += 24 * this.canvasElementsRatio;
			} else if (centerPaddle - centerBall < -50 * this.canvasElementsRatio) {
				this.paddle.computer.yPostition += 10 * this.canvasElementsRatio;
			}

		} else if (this.ball.xPostition.initial <= this.canvasWidth / 2 && this.ball.xPostition.initial > 100 * this.canvasElementsRatio) {
			if (centerPaddle - centerBall > 100 * this.canvasElementsRatio) {
				this.paddle.computer.yPostition -= 3 * this.canvasElementsRatio;
			} else if (centerPaddle - centerBall < -100 * this.canvasElementsRatio) {
				this.paddle.computer.yPostition += 3 * this.canvasElementsRatio;
			}
		}

		if (this.paddle.computer.yPostition >= this.canvasHeight - this.paddle.height) {
			this.paddle.computer.yPostition = this.canvasHeight - this.paddle.height;
		}

		if (this.paddle.computer.yPostition <= 0) {
			this.paddle.computer.yPostition = 0;
		}
	}

	drawGameElements(): void {
		game.drawTable();
		game.drawBall();
		game.drawPlayerPaddle();
		game.drawComputerPaddle();
		game.setComputerPaddleYPostition();
	}

	resizeGameArea(): void {
		setTimeout(() => {
			window.location.reload();
		});
	}
}

const game: Game = new Game();

game.canvas.addEventListener('mousemove', game.setPlayerPaddleYPostition);
window.addEventListener("resize", game.resizeGameArea);

setInterval(game.drawGameElements, 1000 / 60);