import { Particle } from "./particle.js";

class PSOABC {
    constructor(n_Particles, n_Dimensi, obj_Function) {
        this.n_Particles = n_Particles; // Jumlah partikel
        this.particles = []; // Array partikel
        this.n_Dimensi = n_Dimensi; // Dimensi solusi
        this.obj_Function = obj_Function; // Fungsi objektif
        this.gbestFitness = -Infinity; // Fitness terbaik global
        this.gbestPosition = []; // Posisi terbaik global
        this.init_particles(); // Inisialisasi partikel
    }

    // Inisialisasi partikel
    init_particles() {
        for (let i = 0; i < this.n_Particles; i++) {
            const particle = new Particle(this.n_Dimensi, this.obj_Function);
            particle.inisialisasiPosisi(0, 10); // Rentang posisi [0, 10]
            this.particles.push(particle);
        }
    }

    // Evaluasi fitness setiap partikel
    evaluateFitness() {
        this.particles.forEach((particle) => particle.hitungFitness());
    }

    // Update Pbest (Personal Best)
    updatePbest() {
        this.particles.forEach((particle) => particle.updatePbest());
    }

    // Update Gbest (Global Best)
    updateGbest() {
        this.particles.forEach((particle) => {
            if (particle.pbestFitness > this.gbestFitness) {
                this.gbestFitness = particle.pbestFitness;
                this.gbestPosition = [...particle.pbest];
            }
        });
    }

    // Update kecepatan setiap partikel (PSO mekanisme)
    updateVelocity(c1 = 1.5, c2 = 1.5, w = 0.7) {
        this.particles.forEach((particle) => {
            for (let i = 0; i < this.n_Dimensi; i++) {
                const r1 = Math.random();
                const r2 = Math.random();
                particle.velocity[i] =
                    w * particle.velocity[i] +
                    c1 * r1 * (particle.pbest[i] - particle.position[i]) +
                    c2 * r2 * (this.gbestPosition[i] - particle.position[i]);
            }
        });
    }

    // Update posisi setiap partikel
    updatePosition() {
        this.particles.forEach((particle) => particle.updatePosition(0, 10));
    }

    // Mekanisme eksplorasi ABC
    abcExploration() {
        this.particles.forEach((particle) => {
            const newPos = particle.position.map(pos => pos + (Math.random() - 0.5) * 2);
            const newFitness = this.obj_Function(...newPos);

            // Jika fitness baru lebih baik, perbarui posisi partikel
            if (newFitness > particle.fitness) {
                particle.position = [...newPos];
                particle.fitness = newFitness;
            }
        });
    }

    // Hybrid PSO + ABC
    mainHybrid() {
        this.evaluateFitness(); // Evaluasi fitness
        this.updatePbest(); // Update Pbest
        this.updateGbest(); // Update Gbest

        // Mekanisme PSO
        this.updateVelocity();
        this.updatePosition();

        // Mekanisme eksplorasi ABC
        this.abcExploration();
    }
}

export { PSOABC };
