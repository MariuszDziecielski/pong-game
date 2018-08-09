class Game {
	canvas: HTMLCanvasElement = document.querySelector('canvas');
	canvasWidth: number = this.canvas.width = 1200;
	canvasHeight: number = this.canvas.height = 700;
	context: CanvasRenderingContext2D = this.canvas.getContext('2d');

	ballDimensions: number = 18;
	ballXPostition: number = this.canvasWidth / 2 - this.ballDimensions / 2;
	ballYPostition: number = this.canvasHeight / 2 - this.ballDimensions / 2;
	ballXPostitionChange: number = 1.5;
	ballYPostitionChange: number = 1.5;

	paddleHeight: number = 120;
	paddleWidth: number = 18;
	playerPaddleXPostition: number = 60;
	computerPaddleXPostition: number = this.canvasWidth - (this.playerPaddleXPostition + this.paddleWidth);
	playerPaddleYPostition: number = (this.canvasHeight - this.paddleHeight) / 2;
	computerPaddleYPostition: number = (this.canvasHeight - this.paddleHeight) / 2;

	drawPlayerPaddle(): void {
		this.context.fillStyle = 'orange';
		this.context.fillRect(this.playerPaddleXPostition, this.playerPaddleYPostition, this.paddleWidth, this.paddleHeight);
	}

	drawComputerPaddle(): void {
		this.context.fillStyle = '#80ff80';
		this.context.fillRect(this.computerPaddleXPostition, this.computerPaddleYPostition, this.paddleWidth, this.paddleHeight);
	}

	drawBall(): void {
		this.context.fillStyle = '#fff7cc';
		this.context.fillRect(this.ballXPostition, this.ballYPostition, this.ballDimensions, this.ballDimensions);

		this.ballXPostition += this.ballXPostitionChange;
		this.ballYPostition += this.ballYPostitionChange;

		if (this.ballYPostition <= 0 || this.ballYPostition + this.ballDimensions >= this.canvasHeight) {
			this.ballYPostitionChange = -this.ballYPostitionChange;
			this.setBallXPostitionChange();
		}

		if (this.ballXPostition <= 0 || this.ballXPostition + this.ballDimensions >= this.canvasWidth) {
			this.ballXPostitionChange = -this.ballXPostitionChange;
			this.setBallXPostitionChange();
		}
	}

	drawTable(): void {
		const courtLineWidth: number = 5;
		const courtLineHeight: number = 28;

		this.context.fillStyle = '#006400';
		this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

		for (let lineYPosition = 18; lineYPosition < this.canvasHeight; lineYPosition += 46) {
			this.context.fillStyle = '#ccffcc';
			this.context.fillRect(this.canvasWidth / 2 - courtLineWidth / 2, lineYPosition, courtLineWidth, courtLineHeight);
		}
	}

	setPlayerPaddleYPostition(event: any): void {
		const canvasPosition: ClientRect = game.canvas.getBoundingClientRect();
		game.playerPaddleYPostition = event.clientY - canvasPosition.top - game.paddleHeight / 2;

		if (game.playerPaddleYPostition >= game.canvasHeight - game.paddleHeight) {
			game.playerPaddleYPostition = game.canvasHeight - game.paddleHeight;
		}
		if (game.playerPaddleYPostition <= 0) {
			game.playerPaddleYPostition = 0;
		}
	}

	setBallXPostitionChange(): void {
		if (this.ballXPostitionChange > 0 && this.ballXPostitionChange < 16) {
			this.ballXPostitionChange += 0.2;
		} else if (this.ballXPostitionChange < 0 && this.ballXPostitionChange > -16)
			this.ballXPostitionChange -= 0.2;

		if (this.ballYPostitionChange > 0 && this.ballYPostitionChange < 16) {
			this.ballYPostitionChange += 0.2;
		} else if (this.ballYPostitionChange < 0 && this.ballYPostitionChange > -16)
			this.ballYPostitionChange -= 0.2;
	}

	setComputerPaddleYPostition(): void {
		const centerPaddle: number = this.computerPaddleYPostition + this.paddleHeight / 2;
		const centerBall: number = this.ballYPostition + this.ballDimensions / 2;

		if (this.ballXPostition > this.canvasWidth / 2) {
			if (centerPaddle - centerBall > 200) {
				this.computerPaddleYPostition -= 24;
			} else if (centerPaddle - centerBall > 50) {
				this.computerPaddleYPostition -= 10;
			} else if (centerPaddle - centerBall < -200) {
				this.computerPaddleYPostition += 24;
			} else if (centerPaddle - centerBall < -50) {
				this.computerPaddleYPostition += 10;
			}

		} else if (this.ballXPostition <= this.canvasWidth / 2 && this.ballXPostition > 100) {
			if (centerPaddle - centerBall > 100) {
				this.computerPaddleYPostition -= 3;
			} else if (centerPaddle - centerBall < -100) {
				this.computerPaddleYPostition += 3;
			}
		}

		if (this.computerPaddleYPostition >= this.canvasHeight - this.paddleHeight) {
			this.computerPaddleYPostition = this.canvasHeight - this.paddleHeight;
		}

		if (this.computerPaddleYPostition <= 0) {
			this.computerPaddleYPostition = 0;
		}
	}

	drawGameElements(): void {
		game.drawTable();
		game.drawBall();
		game.drawPlayerPaddle();
		game.drawComputerPaddle();
		game.setComputerPaddleYPostition();
	}

}

const game: Game = new Game();
game.canvas.addEventListener('mousemove', game.setPlayerPaddleYPostition);
setInterval(game.drawGameElements, 1000 / 60);