import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk để lấy tất cả user
export const getAllNonAdminUsers = createAsyncThunk(
  "admin/getAllNonAdminUsers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/alluser`, // URL API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Gửi userId qua body
        }
      );

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Xử lý lỗi từ server
      }

      const data = await response.json();

      return data; // Trả về dữ liệu khách sạn thành công
    } catch (error) {
      // Bắt các lỗi không mong muốn (ví dụ: lỗi mạng)
      return rejectWithValue(error.message);
    }
  }
);