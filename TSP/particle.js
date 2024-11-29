// particle.js

class Particle {
    constructor(nDimensi, objFunction) {
        this.objFunction = objFunction;
        this.nDimensi = nDimensi;
        this.position = Array.from({ length: nDimensi }, (_, i) => i); // Inisialisasi urutan kota
        this.velocity = Array(nDimensi).fill(0);
        this.pbest = [...this.position];
        this.pbestFitness = Infinity; // Semakin kecil jarak, semakin baik
        this.fitness = Infinity;
    }

    inisialisasiPosisi(min, max) {
        for (let i = 0; i < this.nDimensi; i++) {
            this.position[i] = i; // Menetapkan urutan kota
        }
        this.position = this.shuffleArray(this.position); // Mengacak urutan kota
        this.pbest = [...this.position];
    }

    shuffleArray(array) {
        // Mengacak urutan kota
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap
        }
        return array;
    }

    hitungFitness() {
        // Menghitung jarak total berdasarkan urutan kota
        this.fitness = this.objFunction(this.position);
    }

    updatePbest() {
        // Memperbarui posisi terbaik jika ditemukan jarak lebih kecil
        if (this.fitness < this.pbestFitness) {
            this.pbestFitness = this.fitness;
            this.pbest = [...this.position];
        }
    }

    updatePosition() {
        // Mengupdate posisi berdasarkan kecepatan (untuk TSP, kecepatan berhubungan dengan pertukaran posisi)
        for (let i = 0; i < this.nDimensi; i++) {
            if (Math.random() < 0.5) {
                let temp = this.position[i];
                this.position[i] = this.position[(i + 1) % this.nDimensi];
                this.position[(i + 1) % this.nDimensi] = temp;
            }
        }
    }
}

export { Particle };
