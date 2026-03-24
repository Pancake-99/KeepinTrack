import { heroStats } from "../data/routineData";

export default function Hero() {
	return (
		<div className="hero" style={{ animation: "fadeUp 0.5s ease both" }}>
			<div>
				<div className="hero-label">Training Protocol</div>
				<h1>
					Keepin'<em>Track</em>
				</h1>
			</div>
			<div className="hero-stats">
				<div className="stat-chip">
					Age <span>{heroStats.age}</span>
				</div>
				<div className="stat-chip">
					Weight <span>{heroStats.weight}</span>
				</div>
				<div className="stat-chip">
					Height <span>{heroStats.height}</span>
				</div>
				<div className="stat-chip">
					Body Fat <span>{heroStats.bodyFat}</span>
				</div>
				<div className="stat-chip">
					Location <span>{heroStats.location}</span>
				</div>
			</div>
		</div>
	);
}
