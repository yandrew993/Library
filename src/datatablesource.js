export const userColumns = [
  { field: "studentId", headerName: "ID", width: 70, headerAlign: "center", align: "center" },
  {
    field: "name",
    headerName: "UserName",
    width: 200,
    headerAlign: "center", align: "center",
    renderCell: (params) => (
      <div className="cellWithImg">
        {/* <img
          className="cellImg"
          src={params.row.avatar || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt="avatar"
        /> */}
        {params.row.name}
      </div>
    ),
  },
  { field: "email", headerName: "Email", width: 230, headerAlign: "center", align: "center" },
  { field: "role", headerName: "Role", width: 120, headerAlign: "center", align: "center" },
  { field: "createdAt", headerName: "Created At", width: 200, headerAlign: "center", align: "center" },
];

export const postColumns = [
  { field: "id", headerName: "ID", width: 70, headerAlign: "center", align: "center" },
  { field: "bookId", headerName: "Book ID", width: 200, headerAlign: "center", align: "center" },
  { field: "title", headerName: "Title", width: 200, headerAlign: "center", align: "center" },
  { field: "subject", headerName: "Subject", width: 200, headerAlign: "center", align: "center" },
  { field: "available", headerName: "Status", width: 150, headerAlign: "center", align: "center", renderCell: (params) => (
    <span  style={{
      color: params.row.available ? "green" : "orange",
      fontWeight: "bold",
    }}>{params.row.available ? "Available" : "Issued"}</span>
  ), },
  // { field: "bedroom", headerName: "Bedrooms", width: 100 },
  // { field: "bathroom", headerName: "Bathrooms", width: 100 },
  { field: "createdAt", headerName: "Created At", width: 180 },
  {
    field: "images",
    headerName: "Images",
    width: 120,
    renderCell: (params) => (
      <img className="cellImg" src={params.row.images[0] || "https://via.placeholder.com/50"} alt="post" />
    ),
  },
];

export const postDetailColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "desc", headerName: "Description", width: 300 },
  { field: "utilities", headerName: "Utilities", width: 150 },
  { field: "pet", headerName: "Pet Policy", width: 150 },
  { field: "income", headerName: "Min. Income", width: 120 },
  { field: "size", headerName: "Size (sqft)", width: 120 },
  { field: "school", headerName: "Nearby Schools", width: 150 },
  { field: "bus", headerName: "Bus Stops", width: 120 },
  { field: "restaurant", headerName: "Restaurants", width: 150 },
];

export const savedPostColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "postId", headerName: "Post ID", width: 200 },
  { field: "userId", headerName: "User ID", width: 200 },
  { field: "createdAt", headerName: "Saved At", width: 200 },
];

export const chatColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "users", headerName: "Users", width: 300, valueGetter: (params) => params.row.users.join(", ") },
  { field: "lastMessage", headerName: "Last Message", width: 300 },
  { field: "createdAt", headerName: "Created At", width: 200 },
];

export const messageColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "text", headerName: "Message", width: 300 },
  { field: "userId", headerName: "User ID", width: 200 },
  { field: "chatId", headerName: "Chat ID", width: 200 },
  { field: "createdAt", headerName: "Sent At", width: 200 },
];

export const bookingColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "userId", headerName: "User ID", width: 200 },
  { field: "postId", headerName: "Post ID", width: 200 },
  { field: "startDate", headerName: "Start Date", width: 180 },
  { field: "endDate", headerName: "End Date", width: 180 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "createdAt", headerName: "Booked At", width: 200 },
];

export const paymentColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "amount", headerName: "Amount ($)", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "method", headerName: "Payment Method", width: 200 },
  { field: "transactionId", headerName: "Transaction ID", width: 300 },
  { field: "bookingId", headerName: "Booking ID", width: 200 },
  { field: "createdAt", headerName: "Paid At", width: 200 },
];
