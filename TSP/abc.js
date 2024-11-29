    // abc.js

    import { Particle } from "./particle.js";  // Pastikan untuk mengimpor kelas Particle

    class PSOABC {
        constructor(n_Particles, n_Dimensi, obj_Function) {
            this.n_Particles = n_Particles;
            this.particles = [];
            this.n_Dimensi = n_Dimensi;
            this.obj_Function = obj_Function;
            this.gbestFitness = Infinity;  // In TSP, we want to minimize the distance
            this.gbestPosition = [];
            this.init_particles();  // Panggil inisialisasi partikel
        }

        // Fungsi untuk mengacak array
        shuffleArray(array) {
            let shuffledArray = array.slice(); // Salin array untuk mencegah modifikasi langsung
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Pilih indeks acak
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Tukar elemen
            }
            return shuffledArray;
        }

        init_particles() {
            for (let i = 0; i < this.n_Particles; i++) {
                const particle = new Particle(this.n_Dimensi, this.obj_Function);  // Memanggil constructor Particle
                particle.inisialisasiPosisi(0, 10);  // Atur posisi awal (ini tergantung pada kasus TSP Anda)
                this.particles.push(particle);
            }
        }

        // Fungsi lainnya tetap sama
        evaluateFitness() {
            this.particles.forEach((particle) => particle.hitungFitness());
        }

        updatePbest() {
            this.particles.forEach((particle) => particle.updatePbest());
        }

        updateGbest() {
            this.particles.forEach((particle) => {
                if (particle.pbestFitness < this.gbestFitness) {  // Minimasi jarak (fitness lebih kecil lebih baik)
                    this.gbestFitness = particle.pbestFitness;
                    this.gbestPosition = [...particle.pbest];
                }
            });
        }

        updateVelocity(c1 = 1, c2 = 1, w = 0.7) {
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

        updatePosition() {
            this.particles.forEach((particle) => {
                // Shuffle posisi kota untuk mendapatkan urutan baru
                const newPosition = this.shuffleArray(particle.position);
                if (newPosition.length === this.n_Dimensi) {
                    particle.position = [...newPosition];
                }
            });
        }

        // ABC Mechanism
        abcExploration() {
            this.particles.forEach((particle) => {
                // Membuat urutan baru berdasarkan posisi yang valid
                const newPos = this.shuffleArray(particle.position);
                
                // Pastikan urutan kota adalah unik dan sesuai dengan jumlah kota
                const validNewPos = Array.from(new Set(newPos));  // Menghindari duplikasi kota
                if (validNewPos.length === this.n_Dimensi) {  // Validasi panjang posisi
                    const newFitness = this.obj_Function(validNewPos);
                    if (newFitness < particle.fitness) {
                        particle.position = [...validNewPos];
                        particle.fitness = newFitness;
                    }
                }
            });
        }

        mainHybrid() {
            this.evaluateFitness();
            this.updatePbest();
            this.updateGbest();

            // Hybrid strategy
            this.updateVelocity();
            this.updatePosition();

            // Include ABC exploration
            this.abcExploration();
        }
    }

    export { PSOABC };
