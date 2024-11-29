function maxProfit(x, y, z) {
    // Pastikan x, y, z adalah nilai numerik dan tidak null atau undefined
    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
        return 0; // Kembalikan 0 jika ada masalah dengan input
    }

    const profitKaos = 50000;
    const profitKemeja = 80000;
    const profitDress = 120000;

    const kainA = 1.5;
    const kainB = 2;
    const kainC = 3;

    const benangA = 20;
    const benangB = 30;
    const benangC = 25;

    const kancingA = 0;
    const kancingB = 5;
    const kancingC = 3;

    const maxKain = 20;
    const maxBenang = 500;
    const maxKancing = 100;

    const totalKain = x * kainA + y * kainB + z * kainC;
    const totalBenang = x * benangA + y * benangB + z * benangC;
    const totalKancing = x * kancingA + y * kancingB + z * kancingC;
    const totalProfit = x * profitKaos + y * profitKemeja + z * profitDress;

    if (totalKain > maxKain || totalBenang > maxBenang || totalKancing > maxKancing) {
        return 0; // Jika bahan melebihi batas, kembalikan profit 0
    } else {
        return totalProfit; // Kembalikan total profit
    }
}

export { maxProfit };
