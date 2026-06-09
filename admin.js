const token = localStorage.getItem("token");

fetch(
    "https://backend-qai6.onrender.com/api/admin/dashboard",
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
)
.then(res => res.json())
.then(data => {

    document.getElementById("users").textContent =
        data.totalUsers;

    document.getElementById("products").textContent =
        data.totalProducts;

    document.getElementById("orders").textContent =
        data.totalOrders;

    document.getElementById("messages").textContent =
        data.totalMessages;

})
.catch(err => console.log(err));