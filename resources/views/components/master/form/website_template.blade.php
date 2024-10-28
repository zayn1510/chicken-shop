<div class="row">
    <div class="col-12 poppins">
        <form>
            <input type="hidden" class="form-control poppins profiles font-12" id="id" name="id"
            value="{{ $website->id }}" required>
            <div class="form-group">
                <div class="detail-item">
                    <label for="name"> Nama Website</label>
                    <input type="text" class="form-control poppins profiles font-12" id="name" name="name"
                        value="{{ $website->name }}" required>
                </div>
            </div>
            <div class="form-group">
                <div class="detail-item">
                    <label for="email">Email</label>
                    <input type="email" class="form-control poppins profiles font-12" id="email" name="email"
                        value={{ $website->email }} required>
                </div>
            </div>
            <div class="form-group">
                <div class="detail-item">
                    <label for="description">Deskripsi</label>
                    <textarea class="form-control poppins profiles font-12" id="description" name="description">{{$website->description}}</textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="detail-item">
                    <label for="address">Alamat</label>
                    <textarea class="form-control poppins profiles font-12" id="address" name="address">{{$website->address}}</textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="detail-item">
                    <label for="old">Nomor Telepon</label>
                    <input type="tel" class="form-control poppins profiles font-12" id="phone" name="phone"
                        value={{ $website->phone }} required>
                </div>
            </div>
            <div class="form-group">
                <div class="detail-item">
                    <label for="website">Alamat Website</label>
                    <input type="text" class="form-control poppins profiles font-12" id="website" name="website"
                        value={{ $website->website }} required>
                </div>
            </div>

            <div class="form-group">
                <div class="detail-item">
                    <label for="logo">Logo Website</label>
                    <input type="file" class="form-control poppins font-12" id="logo" name="logo"
                       >
                </div>
            </div>
            <div class="form-group">
                <div class="detail-item">
                    <label for="foto">Foto Website</label>
                    <input type="file" class="form-control poppins font-12" id="image"
                        name="image">
                </div>
            </div>

            <div class="form-group">
                <div class="detail-item">
                    <button class="btn btn-primary " type="submit" data-action="perbarui-profil-website">Perbarui Akun</button>
                </div>
            </div>

        </form>
    </div>


</div>
