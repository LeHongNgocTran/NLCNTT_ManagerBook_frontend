<!-- Thông tin sinh viên mượn sách -->
<template>
    <div class='add--wrapper'>
        <h2 class="py-5">THÊM THÔNG TIN SINH VIÊN MƯỢN SÁCH</h2>
        <div class='second--add__container bg-white py-5 border shadow-lg px-4'>
            <div class='container-fluid mb-5'>
                <div class="row mb-5">
                    <div class="col">
                        <!-- Name input -->
                        <div class="form-outline">
                            <label class="form-label" for="mssv">Mã số sinh viên</label>
                            <input type="text" placeholder="Nhập mã số sinh viên" name="masinhvien"
                                v-model="this.infor.masinhvien" class="form-control" />
                        </div>
                    </div>
                    <div class="col">
                        <!-- Loại sách -->
                        <label for="hoten">Tên sinh viên</label>
                        <input type="text" name="hoten" placeholder="Nhập tên sinh viên" v-model="this.infor.hoten"
                            class="form-control" />
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col">
                        <!-- Name input -->
                        <div class="form-outline">
                            <label class="form-label" for="idbook">Tên sách</label>
                            <div class='d-flex flex-row'>
                                <vue-bootstrap-typeahead :data="this.sach" :serializer="s => s.tensach" id="idbook"
                                    name='book' @hit="this.book = $event.tensach"
                                    placeholder="Nhập tên sách" class="form-add fs-4" @keyup.enter="addbook">
                                </vue-bootstrap-typeahead>
                                <button class='btn btn-success d-flex flex-row px-3 py-2' @click="addbook">
                                    <font-awesome-icon icon="fa-solid fa-plus" class='mt-2' />
                                    &nbsp;Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row mb-5'>
                    <div class='col'>
                        <table class='table table-hover'>
                            <thead>
                                <tr class="text-center text-uppercase bg-secondary bg-opacity-25 ">
                                    <th class='py-3'>STT</th>
                                    <th class='py-3'>Tên sách</th>
                                    <th class='py-3'>Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id='lits-book-item' v-for="(book, index) in books" v-bind:key="index"
                                    v-bind:title="book.title" class="text-center align-middle">
                                    <td class='py-2'>{{ index + 1 }}</td>
                                    <td class='py-2'>{{ book.title }}</td>
                                    <td class='py-2'>
                                        <button @click="deleteBook(index)">
                                            <font-awesome-icon color="black" size='1x' class="bg-body border-0"
                                                icon="fa-solid fa-xmark" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>
                        <router-link :to="{ name: 'listrentbook' }">
                            <font-awesome-icon icon="fa-solid fa-arrow-left" />
                            &nbsp; Quay lại
                        </router-link>
                    </div>
                    <div class='col d-flex justify-content-end'>
                        <button class='btn btn-primary' @click="addPhieuMuon()">
                            <font-awesome-icon icon="fa-solid fa-plus" class='mt-2' />
                            &nbsp;Hoàn tất
                        </button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import PhieuMuonService from "@/services/phieumuon.service";
import BookService from "@/services/book.service";

import {
    usePhieuMuonStore
} from "@/store/useStore";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
export default {
    components: {
        VueBootstrapTypeahead
    },
    data() {
        // Ngày bắt đầu mượn
        var dateTimeStart = new Date();

        // Ngày hết hạn
        var dateTimeEnd = new Date();
        dateTimeEnd.setDate(dateTimeEnd.getDate() + 3)

        return {
            book: "",
            books: [],
            nextBookId: 1,
            infor: [],
            phieumuon: [],
            length: usePhieuMuonStore().length,
            trangthai: false,
            dateTimeStart,
            dateTimeEnd,
            danhsachsach: [],
            thoigiantrasach: "",
            sach: [],
        }
    },
    methods: {
        addbook() {
            this.books.push({
                title: this.book.trim()
            })
            this.newBookId = ''
            this.book = ''
        },

        deleteBook(i) {
            this.books.splice(i, 1)
        },

        async getBook() {
            this.sach = await BookService.getAll();
            console.log(this.sach);
        },
        async addPhieuMuon() {
            const data = {
                _id: 'PM' + usePhieuMuonStore().length,
                ...this.infor,
                danhsachsach: this.books,
                trangthai: this.trangthai,
                dateTimeStart: this.dateTimeStart,
                dateTimeEnd: this.dateTimeEnd,
                thoigiantrasach: this.thoigiantrasach,
            };
            console.log(this.books);
            if (this.infor.masinhvien != undefined  && this.infor.hoten != undefined  && this.books.length != 0){
                if (confirm("Thêm phiếu mượn thành công!!!")) {
                try {
                    this.phieumuon = await PhieuMuonService.createPhieuMuon(data);

                    this.books.forEach((e) => {
                        BookService.changeTrangThai({
                            title: e.title,
                            trangthai: true,
                        });
                    });
                    this.$router.push({
                        name: 'listrentbook'
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            }else {
                confirm("Không thể  tạo phiếu mượn")
            }
           
        }
    },
    mounted() {
        this.getBook();
    }
}
</script>

<style lang="scss" scoped>
label {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
}

input,
select {
    height: 40px;
    font-size: 1.6rem;
}

a:hover {
    color: red !important;
    font-size: 1.6rem;
    ;
    text-decoration: underline !important;
}

button {
    font-size: 1.6rem;
}
#idbook{
    width: 100%;
    height:40px;
    font-size: 1.6rem !important;
}


</style>
