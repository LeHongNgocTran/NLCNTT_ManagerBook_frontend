// Quản lý đường dẫn của Admin
import Admin from "@/layouts/AdminScreen/adminscreen.vue";
import Dashboard from '../pages/Admin/Dashboard.vue';
import ListBook from "../pages/Admin/ListBook.vue";
import ListRentBook from "../pages/Admin/ListRentBook.vue";
import ListRenewalBook from "../pages/Admin/BookRenewal.vue";
import ListMissBook from "../pages/Admin/ListMissBook.vue";
import AddBook from "../pages/Admin/AddBook.vue";
import InforLendBook from "../pages/Admin/InforLendBook.vue";

export default [
    {
        path: "/admin",
        name: 'admin',
        component: Admin,
        children: [
            {
                // Trang tổng quan
                path: "dashboard",
                name: 'dashboard',
                component: Dashboard
            },
            {   
                //Trang danh sách sách
                path: "listbook",
                name: 'listbook',
                component: ListBook,
               
            },
            {
                //Trang thêm sách vào hệ thống
                path: 'addbook',
                name: 'addbook',
                component: AddBook
            },
            {
                // Trang danh sách sinh viên mượn sách
                path: 'rentbook',
                name : "listrentbook",
                component: ListRentBook,
               
            },
            {
                // Trang danh sách sinh viên gia hạn
                path: 'renewalbook',
                name: 'listrenewalbook',
                component: ListRenewalBook
            },
            {
                // Trang danh sách sinh viên trễ  hạn
                path: 'listmissbook',
                name: 'listmissbook',
                component: ListMissBook
            },
            {
                // Trang thêm thông tin vào sinh viên mượn sách
                path:'lendbook',
                name: "inforlendbook",
                component: InforLendBook
            }
            
        ]
    }
]