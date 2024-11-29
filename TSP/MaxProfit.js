function tspDistance(route, distanceMatrix) {
    // Validasi input
    if (!Array.isArray(route) || !Array.isArray(distanceMatrix)) {
        throw new Error("Invalid input: 'route' and 'distanceMatrix' must be arrays.");
    }
    if (route.some(city => city < 0 || city >= distanceMatrix.length)) {
        throw new Error("Invalid route: Contains indices out of bounds.");
    }

    // Debugging log
    console.log("Route:", route);
    console.log("Distance Matrix:", distanceMatrix);

    let totalDistance = 0;

    try {
        // Hitung jarak antar kota dalam route
        for (let i = 0; i < route.length - 1; i++) {
            totalDistance += distanceMatrix[route[i]][route[i + 1]];
        }
        // Tambahkan jarak kembali ke kota awal
        totalDistance += distanceMatrix[route[route.length - 1]][route[0]];
    } catch (error) {
        console.error("Error calculating tspDistance:", error);
        throw new Error("Failed to calculate total distance. Check the route and distance matrix.");
    }

    // Debugging log untuk total distance
    console.log("Total Distance:", totalDistance);

    return totalDistance; // Semakin kecil jarak, semakin baik
}

export { tspDistance };
