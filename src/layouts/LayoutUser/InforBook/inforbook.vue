<template>
    <div class='inforbook-wrapper'>
        <div class='inforbook-title'>
            <p class='p-3 fs-4'>TỔNG QUAN</p>
        </div>
        <!-- chưa hiển thị details -->
        <div id='infor__books' 
            @click="updateActiveIndex(index)" 
            class='inforbook border p-3 my-4'
            :class="{active:index === activeIndex}"
            v-for="book of this.displayBooks" 
            :key="books._id">
            <div class='inforbook-content' v-if="book.isActive == null">
                <p class='text-primary'>
                    <strong class='text-dark'>Tên sách: </strong>
                    {{ book.tensach }}
                </p>
                <p>
                    <strong>Tác giả: </strong>
                    {{ book.tentacgia }}
                </p>
                <p>
                    <strong>Nhà xuất bản:</strong> {{ book.tenNXB }}
                </p>
                <p class='text-primary'>
                    <strong class='text-dark'>Số thứ thự trên kệ sách:</strong> {{ book.stt }}/{{ book.soke }}/{{
                            book.tenday
                    }} -
                    STT/SOKE/TENDAY
                </p>
                <p>
                    <strong>Trạng thái:</strong>
                    <button v-if="book.trangthai == true" class='btn btn-danger btn-small fs-5 rounded-pill px-3 ms-3'>
                        Đã mượn
                    </button>
                    <button v-else class='btn btn-success btn-small fs-5 rounded-pill px-3 ms-3'>
                        Chưa mượn
                    </button>
                </p>
            </div>
            <div class="inforbook-content d-flex flex-row" v-else>
                <div class='inforbook-image me-5'>
                    <img class='w-100 h-100' :src="'../src/assets/images/Book/'+book.imageUrl" alt={{book.tensach}} />
                </div>
                <div>
                    <table>
                        <tr>
                            <td>
                                <strong>Loại sách:</strong>
                            </td>
                            <td>{{ book.tenloai }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Tác giả:</strong>
                            </td>
                            <td>{{ book.tentacgia }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Nhà xuất bản:</strong>
                            </td>
                            <td>{{ book.tenNXB }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Số thứ tự trên kệ sách:</strong>&emsp;
                            </td>
                            <td>{{ book.stt }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Tến dãy</strong>
                            </td>
                            <td>{{ book.tenday }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Số kệ</strong>
                            </td>
                            <td>{{ book.soke }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Trạng thái sách:</strong>
                            </td>
                            <td>
                                <button v-if="book.trangthai == true"
                                    class='btn btn-danger btn-small fs-5 rounded-pill px-3 ms-3'>
                                    Đã mượn
                                </button>
                                <button v-else class='btn btn-success btn-small fs-5 rounded-pill px-3 ms-3'>
                                    Chưa mượn
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class='button-content' v-if="book.isActive == null">
                <button @click="book.isActive = 1">
                    Chi tiết &nbsp;
                    <font-awesome-icon icon="fa-solid fa-arrow-right"></font-awesome-icon>
                </button>
            </div>
            <div class='button-content' v-else>
                <button @click="book.isActive = null">
                    Quay lại &nbsp;
                    <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
                </button>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" size="lg"
                @click='pagination(currentPage)'></b-pagination>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowRight, faArrowLeft);


import BookService from "@/services/book.service";
export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 }
    },
    emits: ["update: activeIndex"],
    data() {
        return {
            perPage: 3,
            currentPage: 3,
            rows: this.books.length,
            isActive: true,
            // books: [],
            displayBooks: this.books.slice(0, 3),
        }
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update: activeIndex", index)
        },
        toggleDetailsBook() {
            if (this.isActive == true) {
                this.isActive = false;
            } else {
                this.isActive = true;
            }
        },

        pagination(currentPage) {
            const start = (currentPage - 1) * this.perPage;
            this.displayBooks = this.books.slice(start, start + 3);
        }
    },
}
</script>

<style scoped>
.inforbook-wrapper {
    font-size: 1.4rem;
    margin-top: 10px;
    margin-bottom: 10px;
}

.inforbook-content {
    margin-left: 15px;
    font-size: 1.3rem;
    /* margin-bottom: 5px; */
    height: 150px;
}

.inforbook-title {
    font-weight: bold;
    background-color: rgb(241, 241, 241);
}

.inforbook-image {
    width: 25%;
}

.button-content {
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 5px;
}

.button-content button {
    font-size: 1.3rem;
    padding: 4px 6px;
}

.button-content button:hover {
    color: white;
    font-weight: 400;
}
</style>
