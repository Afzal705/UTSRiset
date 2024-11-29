class Particle {
    constructor(nDimensi, objFunction) {
        this.objFunction = objFunction; // Fungsi objektif
        this.nDimensi = nDimensi; // Dimensi solusi
        this.position = Array(nDimensi).fill(0); // Posisi partikel
        this.velocity = Array(nDimensi).fill(0); // Kecepatan partikel
        this.pbest = Array(nDimensi).fill(0); // Posisi terbaik personal
        this.pbestFitness = -Infinity; // Fitness terbaik personal
        this.fitness = -Infinity; // Fitness partikel
    }

    // Inisialisasi posisi partikel dalam rentang [min, max]
    inisialisasiPosisi(min, max) {
        for (let i = 0; i < this.nDimensi; i++) {
            this.position[i] = Math.random() * (max - min) + min;
            this.velocity[i] = 0; // Kecepatan awal diatur ke 0
            this.pbest[i] = this.position[i];
        }
    }

    // Hitung fitness partikel menggunakan fungsi objektif
    hitungFitness() {
        this.fitness = this.objFunction(...this.position);
    }

    // Perbarui pbest (posisi terbaik personal)
    updatePbest() {
        if (this.fitness > this.pbestFitness) {
            this.pbestFitness = this.fitness;
            this.pbest = [...this.position];
        }
    }

    // Perbarui posisi partikel berdasarkan kecepatan
    updatePosition(min = 0, max = 10) {
        for (let i = 0; i < this.nDimensi; i++) {
            this.position[i] += this.velocity[i];

            // Batasan posisi partikel dalam rentang [min, max]
            if (this.position[i] < min) {
                this.position[i] = min;
            } else if (this.position[i] > max) {
                this.position[i] = max;
            }
        }
    }
}

export { Particle };
