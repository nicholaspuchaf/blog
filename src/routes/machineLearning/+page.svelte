<script lang="ts">
	interface Point {
		x: number;
		y: number;
		canvasX: number;
		canvasY: number;
	}

	interface NoisyPoint extends Point {
		originalY: number; // Armazena o Y original da função
	}

	let points = $state<Point[]>([]);
	let functionPoints = $state<Point[]>([]);
	let noisyPoints = $state<NoisyPoint[]>([]); // Pontos com ruído aplicado
	let canvasWidth = 800;
	let canvasHeight = 800;
	let gridSize = 20;
	
	// Função matemática
	let mathFunction = $state('x+sin(x**2) + tan(log(x))');
	let numPoints = $state(150);
	let xMin = $state(-20);
	let xMax = $state(20);
	let splitPercentage = $state(100); // Porcentagem para treino/teste
	let noiseLevel = $state(10); // Nível de ruído em porcentagem

	function handleCanvasClick(event: MouseEvent) {
        return;
		const canvas = event.currentTarget as HTMLCanvasElement;
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		
		// Converte coordenadas do canvas para coordenadas cartesianas
		const cartesianX = ((x - canvasWidth / 2) / gridSize).toFixed(2);
		const cartesianY = ((canvasHeight / 2 - y) / gridSize).toFixed(2);
		
		points.push({ x: parseFloat(cartesianX), y: parseFloat(cartesianY), canvasX: x, canvasY: y });
	}

	function clearPoints() {
		points = [];
	}

	function plotFunction() {
		functionPoints = [];
		try {
			const step = (xMax - xMin) / numPoints;
			
			for (let i = 0; i <= numPoints; i++) {
				const x = xMin + (i * step);
				// Avalia a função usando eval (cuidado em produção!)
				// Substitui notação matemática comum
				const funcStr = mathFunction
					.replace(/\^/g, '**')
					.replace(/sin/gi, 'Math.sin')
					.replace(/cos/gi, 'Math.cos')
					.replace(/tan/gi, 'Math.tan')
					.replace(/sqrt/gi, 'Math.sqrt')
					.replace(/log/gi, 'Math.log')
					.replace(/exp/gi, 'Math.exp')
					.replace(/abs/gi, 'Math.abs');
				
				const y = eval(funcStr.replace(/x/g, `(${x})`));
				
				if (!isNaN(y) && isFinite(y)) {
					const canvasX = (x * gridSize) + (canvasWidth / 2);
					const canvasY = (canvasHeight / 2) - (y * gridSize);
					functionPoints.push({ x, y, canvasX, canvasY });
				}
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			alert('Erro ao avaliar a função: ' + errorMessage);
		}
	}

	function clearFunction() {
		functionPoints = [];
		// Mantém noisyPoints para continuar mostrando os pontos com ruído
	}

	function applyNoise() {
		if (functionPoints.length === 0) {
			alert('Primeiro plote uma função!');
			return;
		}

		noisyPoints = functionPoints.map(point => {
			// Aplica ruído baseado na porcentagem
			// O ruído é proporcional ao valor de Y
			const noiseAmount = (noiseLevel / 100) * Math.abs(point.y);
			const randomNoise = (Math.random() * 2 - 1) * noiseAmount; // Ruído entre -noiseAmount e +noiseAmount
			
			const noisyY = point.y + randomNoise;
			const canvasX = (point.x * gridSize) + (canvasWidth / 2);
			const canvasY = (canvasHeight / 2) - (noisyY * gridSize);
			
			return {
				x: point.x,
				y: noisyY,
				originalY: point.y, // Armazena o Y original
				canvasX,
				canvasY
			};
		});
	}

	function clearNoisyPoints() {
		noisyPoints = [];
	}

	function exportToCSV() {
		if (noisyPoints.length === 0) {
			alert('Primeiro gere dados com ruído!');
			return;
		}

		const trainSize = Math.floor(noisyPoints.length * splitPercentage / 100);
		let csv = 'index,x,y_original,y_noisy,error,type\n';
		
		noisyPoints.forEach((noisyPoint, i) => {
			const error = Math.abs(noisyPoint.y - noisyPoint.originalY);
			const type = i < trainSize ? 'train' : 'test';
			csv += `${i + 1},${noisyPoint.x},${noisyPoint.originalY},${noisyPoint.y},${error},${type}\n`;
		});

		// Cria um blob e faz download
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `ml_data_${Date.now()}.csv`;
		a.click();
		window.URL.revokeObjectURL(url);
	}

	function drawGrid(ctx: CanvasRenderingContext2D) {
		ctx.strokeStyle = '#3a3f47';
		ctx.lineWidth = 1;

		// Linhas verticais
		for (let i = 0; i <= canvasWidth; i += gridSize) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, canvasHeight);
			ctx.stroke();
		}

		// Linhas horizontais
		for (let i = 0; i <= canvasHeight; i += gridSize) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(canvasWidth, i);
			ctx.stroke();
		}

		// Eixos principais
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = 2;
		
		// Eixo X
		ctx.beginPath();
		ctx.moveTo(0, canvasHeight / 2);
		ctx.lineTo(canvasWidth, canvasHeight / 2);
		ctx.stroke();

		// Eixo Y
		ctx.beginPath();
		ctx.moveTo(canvasWidth / 2, 0);
		ctx.lineTo(canvasWidth / 2, canvasHeight);
		ctx.stroke();

		// Labels dos eixos
		ctx.fillStyle = '#ffffff';
		ctx.font = '12px sans-serif';
		ctx.fillText('X', canvasWidth - 20, canvasHeight / 2 + 20);
		ctx.fillText('Y', canvasWidth / 2 + 10, 15);
	}

	function drawPoints(ctx: CanvasRenderingContext2D) {
		// Desenha linha da função original
		if (functionPoints.length > 0) {
			ctx.strokeStyle = '#ef4444';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(functionPoints[0].canvasX, functionPoints[0].canvasY);
			
			for (let i = 1; i < functionPoints.length; i++) {
				const point = functionPoints[i];
				if (point.canvasX >= 0 && point.canvasX <= canvasWidth && 
				    point.canvasY >= 0 && point.canvasY <= canvasHeight) {
					ctx.lineTo(point.canvasX, point.canvasY);
				}
			}
			ctx.stroke();
		}

		// Desenha pontos com ruído
		if (noisyPoints.length > 0) {
			const trainSize = Math.floor(noisyPoints.length * splitPercentage / 100);
			
			// Pontos de treino (azul)
			noisyPoints.slice(0, trainSize).forEach(point => {
				if (point.canvasX >= 0 && point.canvasX <= canvasWidth && 
				    point.canvasY >= 0 && point.canvasY <= canvasHeight) {
					ctx.fillStyle = '#3b82f6';
					ctx.beginPath();
					ctx.arc(point.canvasX, point.canvasY, 4, 0, 2 * Math.PI);
					ctx.fill();
				}
			});

			// Pontos de teste (verde)
			noisyPoints.slice(trainSize).forEach(point => {
				if (point.canvasX >= 0 && point.canvasX <= canvasWidth && 
				    point.canvasY >= 0 && point.canvasY <= canvasHeight) {
					ctx.fillStyle = '#22c55e';
					ctx.beginPath();
					ctx.arc(point.canvasX, point.canvasY, 4, 0, 2 * Math.PI);
					ctx.fill();
				}
			});
		}

		// Desenha pontos clicados manualmente
		points.forEach(point => {
			ctx.fillStyle = '#a855f7';
			ctx.beginPath();
			ctx.arc(point.canvasX, point.canvasY, 5, 0, 2 * Math.PI);
			ctx.fill();
			
			// Label do ponto
			ctx.fillStyle = '#ffffff';
			ctx.font = '10px sans-serif';
			ctx.fillText(`(${point.x}, ${point.y})`, point.canvasX + 8, point.canvasY - 8);
		});
	}

	function updateCanvas(canvas: HTMLCanvasElement | null) {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = '#1a1d23';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		drawGrid(ctx);
		drawPoints(ctx);
	}

	$effect(() => {
		const canvas = document.getElementById('cartesian-canvas') as HTMLCanvasElement;
		if (canvas) {
			updateCanvas(canvas);
		}
	});
</script>

<div class="container py-5">
	<div class="row justify-content-center">
		<div class="col-12 col-lg-10">
			<div class="bg-light rounded-3 shadow p-4 p-md-5">
				<h1 class="display-4 fw-bold mb-4 text-center">Machine Learning</h1>
				<p class="lead text-center text-muted mb-4">
					Plote funções matemáticas e adicione pontos manualmente
				</p>

				<!-- Controles de Função -->
				<div class="card mb-4">
					<div class="card-body">
						<h5 class="card-title fw-bold mb-3">Plotar Função Matemática</h5>
						<div class="row g-3">
							<div class="col-md-6">
								<label for="mathFunction" class="form-label">Função f(x)</label>
								<input 
									type="text" 
									class="form-control" 
									id="mathFunction"
									bind:value={mathFunction}
									placeholder="Ex: x**2, sin(x), x**3 - 2*x"
								/>
								<small class="form-text text-muted">
									Use: x, +, -, *, /, **, sin, cos, tan, sqrt, log, abs
								</small>
							</div>
							<div class="col-md-2">
								<label for="numPoints" class="form-label">Pontos</label>
								<input 
									type="number" 
									class="form-control" 
									id="numPoints"
									bind:value={numPoints}
									min="10"
									max="500"
								/>
							</div>
							<div class="col-md-2">
								<label for="xMin" class="form-label">X Min</label>
								<input 
									type="number" 
									class="form-control" 
									id="xMin"
									bind:value={xMin}
									step="0.1"
								/>
							</div>
							<div class="col-md-2">
								<label for="xMax" class="form-label">X Max</label>
								<input 
									type="number" 
									class="form-control" 
									id="xMax"
									bind:value={xMax}
									step="0.1"
								/>
							</div>
						</div>
						<div class="mt-3">
							<button class="btn btn-primary me-2" onclick={plotFunction}>
								📈 Plotar Função
							</button>
							<button class="btn btn-outline-secondary" onclick={clearFunction}>
								Limpar Função
							</button>
						</div>
					</div>
				</div>

				<!-- Controles de Ruído e Divisão de Dados -->
				<div class="card mb-4">
					<div class="card-body">
						<h5 class="card-title fw-bold mb-3">Simulação de Machine Learning</h5>
						<div class="row g-3">
							<div class="col-md-4">
								<label for="splitPercentage" class="form-label">Divisão Treino/Teste (%)</label>
								<div class="input-group">
									<input 
										type="number" 
										class="form-control" 
										id="splitPercentage"
										bind:value={splitPercentage}
										min="0"
										max="100"
										step="1"
									/>
									<span class="input-group-text">%</span>
								</div>
								<small class="form-text text-muted">
									{splitPercentage}% treino, {100 - splitPercentage}% teste
								</small>
							</div>
							<div class="col-md-4">
								<label for="noiseLevel" class="form-label">Nível de Ruído (%)</label>
								<div class="input-group">
									<input 
										type="number" 
										class="form-control" 
										id="noiseLevel"
										bind:value={noiseLevel}
										min="0"
										max="100"
										step="1"
									/>
									<span class="input-group-text">%</span>
								</div>
								<small class="form-text text-muted">
									Erro aleatório aplicado aos pontos
								</small>
							</div>
						</div>
						<div class="mt-3">
							<button class="btn btn-success me-2" onclick={applyNoise} disabled={functionPoints.length === 0}>
								🎲 Aplicar Ruído aos Dados
							</button>
							<button class="btn btn-outline-danger me-2" onclick={clearNoisyPoints} disabled={noisyPoints.length === 0}>
								Limpar Dados com Ruído
							</button>
							<button class="btn btn-outline-primary" onclick={exportToCSV} disabled={noisyPoints.length === 0}>
								📥 Exportar CSV
							</button>
						</div>
						<div class="mt-3">
							<div class="d-flex gap-3 flex-wrap">
								<div class="d-flex align-items-center">
									<div class="me-2" style="width: 20px; height: 3px; background: #ef4444;"></div>
									<small>Função Original</small>
								</div>
								<div class="d-flex align-items-center">
									<div class="me-2" style="width: 12px; height: 12px; background: #3b82f6; border-radius: 50%;"></div>
									<small>Dados de Treino</small>
								</div>
								<div class="d-flex align-items-center">
									<div class="me-2" style="width: 12px; height: 12px; background: #22c55e; border-radius: 50%;"></div>
									<small>Dados de Teste</small>
								</div>
								<div class="d-flex align-items-center">
									<div class="me-2" style="width: 12px; height: 12px; background: #a855f7; border-radius: 50%;"></div>
									<small>Pontos Manuais</small>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Canvas -->
				<div class="d-flex justify-content-center mb-4">
					<canvas
						id="cartesian-canvas"
						width={canvasWidth}
						height={canvasHeight}
						onclick={handleCanvasClick}
						class="border border-secondary rounded"
						style="cursor: crosshair; max-width: 100%;"
					></canvas>
				</div>

				<div class="text-center mb-4">
					<button class="btn btn-danger" onclick={clearPoints}>
						Limpar Pontos Manuais
					</button>
				</div>

				<!-- Informações sobre os dados -->
				{#if noisyPoints.length > 0}
					<div class="alert alert-info mb-4">
						<h6 class="fw-bold mb-3">📊 Estatísticas dos Dados com Ruído</h6>
						<div class="row">
							<div class="col-md-4">
								<strong>Total de pontos:</strong> {noisyPoints.length}
							</div>
							<div class="col-md-4">
								<strong class="text-primary">Treino ({splitPercentage}%):</strong> {Math.floor(noisyPoints.length * splitPercentage / 100)} pontos
							</div>
							<div class="col-md-4">
								<strong class="text-success">Teste ({100 - splitPercentage}%):</strong> {Math.ceil(noisyPoints.length * (100 - splitPercentage) / 100)} pontos
							</div>
						</div>
					</div>

					<!-- Tabela com os dados -->
					<div class="mt-4">
						<h5 class="fw-bold mb-3">Dados Gerados ({noisyPoints.length} pontos)</h5>
						<div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
							<table class="table table-striped table-sm">
								<thead class="sticky-top bg-white">
									<tr>
										<th>#</th>
										<th>X</th>
										<th>Y (Original)</th>
										<th>Y (Com Ruído)</th>
										<th>Erro Absoluto</th>
										<th>Tipo</th>
									</tr>
								</thead>
								<tbody>
									{#each noisyPoints as noisyPoint, i}
										{@const error = Math.abs(noisyPoint.y - noisyPoint.originalY)}
										{@const trainSize = Math.floor(noisyPoints.length * splitPercentage / 100)}
										{@const type = i < trainSize ? 'Treino' : 'Teste'}
										<tr class={i < trainSize ? 'table-primary' : 'table-success'}>
											<td>{i + 1}</td>
											<td>{noisyPoint.x.toFixed(3)}</td>
											<td>{noisyPoint.originalY.toFixed(3)}</td>
											<td>{noisyPoint.y.toFixed(3)}</td>
											<td>{error.toFixed(3)}</td>
											<td><span class="badge {i < trainSize ? 'bg-primary' : 'bg-success'}">{type}</span></td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/if}

				{#if points.length > 0}
					<div class="mt-4">
						<h5 class="fw-bold mb-3">Pontos Plotados Manualmente ({points.length})</h5>
						<div class="table-responsive">
							<table class="table table-striped">
								<thead>
									<tr>
										<th>#</th>
										<th>X</th>
										<th>Y</th>
									</tr>
								</thead>
								<tbody>
									{#each points as point, i}
										<tr>
											<td>{i + 1}</td>
											<td>{point.x}</td>
											<td>{point.y}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	canvas {
		background: #1a1d23;
	}
</style>
