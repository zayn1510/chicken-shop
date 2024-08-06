<div class="row hide font-12" id="detail-user">
    <div class="col-md-12">
        <div class="row mt-5">
            <div class="col-md-4">
                <div class="img-anggota">
                    <img src="" id="load_image"
                        onerror="this.onerror=null;this.src='https://via.assets.so/img.jpg?w=1200&h=500&t=%20'">
                </div>
            </div>
            <div class="col-md-7">
                <p class="poppins font-15">Profil Akun</p>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group poppins font-12">
                            <label>Nama depan</label>
                            <input type="text" class="form-control users"disabled />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group poppins font-12">
                            <label>Nama belakang</label>
                            <input type="text" class="form-control users" disabled />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group poppins font-12">
                            <label>Email</label>
                            <input type="email" class="form-control users" disabled />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group poppins font-12">
                            <label>Nomor Telepeon</label>
                            <input type="text" class="form-control users" disabled />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group poppins font-12">
                            <label>Alamat</label>
                            <textarea class="form-control users"></textarea>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-md-12 mt-5">
                <div class="">
                    <p class="poppins font-15">Akses Akun</p>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group poppins font-12">
                                <label>Nama Pengguna</label>
                                <input type="text" class="form-control users" disabled />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group poppins font-12">
                                <label>Kata Sandi</label>
                                <input type="password" class="form-control users" disabled />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group poppins font-12">
                                <label>Roles</label>
                                <select class="right-content form-control users poppins" id="roles">
                                    <option value="0">Admin</option>
                                    <option value="1">Kasir</option>
                                    <option value="2">Customer</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-primary" id="save" data-action="save-form">Simpan</button>
                <button class="btn btn-danger" id="cancel" ng-click="batal()">Kembali</button>
            </div>
        </div>
    </div>
</div>
</div>
