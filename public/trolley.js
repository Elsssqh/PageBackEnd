// Define the AngularJS module
angular.module('bookApp', [])

// Define the controller for the trolley
.controller('TrolleyController', function($scope) {
    // Define trolley items data manually
    $scope.trolleyItems = [
        { title: "Bumi - Tere Liye", price: 70000, quantity: 2 }, // Simulasikan pembelian buku "Bumi" sebanyak 2 dengan harga 70000
        // Tambahkan item trolley lain jika diperlukan
    ];

    // Initialize totalPrice variable to store total price
    $scope.totalPrice = 0;

    // Function to remove item from the trolley
    $scope.removeFromTrolley = function(index) {
        // Remove the item from the trolley
        $scope.trolleyItems.splice(index, 1);

        // Recalculate total price
        $scope.calculateTotalPrice();
    };

    // Function to calculate total price
    $scope.calculateTotalPrice = function() {
        $scope.totalPrice = 0;
        // Iterate through trolley items and calculate total price
        for (var i = 0; i < $scope.trolleyItems.length; i++) {
            $scope.totalPrice += $scope.trolleyItems[i].price * $scope.trolleyItems[i].quantity;
        }
    };

    // Call the calculateTotalPrice function initially to calculate total price
    $scope.calculateTotalPrice();
});
